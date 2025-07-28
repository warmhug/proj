

(async function popup () {
  hl_utils.getCookies();

  chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    // console.log(`Command "${command}" triggered`, window, location.href);
    const clipText = await hl_utils.readClipboardText();
    if (request.action === 'shortcuts' && request.message === 'openGoogTl') {
      chrome.tabs.create({ url: `https://translate.google.com/?sl=zh-CN&tl=en&text=${clipText}&op=translate` });
    }
    sendResponse({ action: request.action, clipText });
    return true;
  });

  const dealResponse = (res) => {
    if (res) {
      hl_utils.confirm(JSON.stringify(res, null, 2));
    }
  };

  // 注意 proxy 设置，以最后一个扩展的设置生效
  // https://developer.chrome.com/docs/extensions/reference/api/types#type-ChromeSetting
  chrome.proxy.settings.onChange.addListener(evt => {
    console.log('chrome.proxy.settings.onChange: ', evt);
  });

  const createBtn = hl_utils.createBtn;
  const operateTabs = (storage) => {
    const wrapper = document.createElement('div');
    wrapper.appendChild(createBtn('恢复tab', async () => {
      // 如果 url 里含有 #xxx 则 匹配不到
      // const savedTabs = await chrome.tabs.query({ url: storage.hl_tabs_saved });
      var tabsAll = async () => await chrome.tabs.query({});
      // 情况: url 相同或只是 origin-pathname 相同，相同 tab 有多个
      // 粗暴处理: 删掉已存在的 origin-pathname 相同的 tab (多个)
      const fileterTabs = [];
      (await tabsAll()).forEach(tab => {
        storage.hl_tabs_saved.forEach((url) => {
          if (tab.url === url || hl_utils.compareUrl(tab.url, url, { matchOriginPathname: true })) {
            fileterTabs.push(tab);
          }
        });
      });
      await chrome.tabs.remove(fileterTabs.map(tab => tab.id));
      const tabsLength = (await tabsAll()).length;
      storage.hl_tabs_saved.forEach((url, idx) => {
        chrome.tabs.create({ url, index: tabsLength + idx });
      });
    }));
    wrapper.appendChild(createBtn('选中/保存tab', async () => {
      const tabs = await chrome.tabs.query({ highlighted: true });
      const saveVal = tabs.map(tab => tab.url);
      const html = `
      选中的
      <pre>${JSON.stringify(saveVal, null, 2)}</pre>
      上次存储的
      <pre>${JSON.stringify(storage.hl_tabs_saved, null, 2)}</pre>
      是否更新已存储的 tab 为新选中的?
      `;
      const confirmResult = await hl_utils.confirm(html);
      console.log('log confirmResult: ', confirmResult);
      if (confirmResult) {
        await hl_utils.setStorage({ hl_tabs_saved: saveVal });
      }
    }));
    wrapper.appendChild(createBtn('重载(删建)tab', async () => {
      dealResponse(await chrome.runtime.sendMessage({ action: 'reloadTabs' }));
    }));
    wrapper.appendChild(createBtn('刷新所有tabs', async () => {
      dealResponse(await chrome.runtime.sendMessage({ action: 'reloadTabs', reloadTabsAll: true }));
    }));
    wrapper.appendChild(createBtn('去重tab', async () => {
      var tabsAll = await chrome.tabs.query({});
      const dupTabs = tabsAll.filter((tab, index) => {
        const idx = tabsAll.findIndex(item => tab.url === item.url);
        if (idx !== index) {
          return tab;
        }
      });
      console.log('dupTabs: ', dupTabs);
      if (window.confirm(`tab总数 ${tabsAll.length} 重复数量 ${dupTabs.length}`)) {
        await chrome.tabs.remove(dupTabs.map(tab => tab.id));
      }
    }));
    return wrapper;
  }

  const proxyListPrefix = 'hl_ctrl_proxy';
  const proxyList = ['whistle', 'company', 'no_proxy', 'clash'];

  const activeSelect = async (ctrlEle, isInit = false, btnEle) => {
    const storage = await hl_utils.getStorage(null);
    const storageField = ctrlEle.getAttribute('data-field');
    const tips = {
      hl_ctrl_proxy_whistle: () => {
        const wrapper = document.createElement('div');
        wrapper.appendChild(hl_utils.createDomByStr(`<span>
  whistle系统级代理已启动 &nbsp;
  <a href="http://127.0.0.1:8899" target="_blank">规则配置</a> &nbsp;
  <a href="https://wproxy.org/whistle/install.html" target="_blank">文档</a>
  &nbsp;
</span>`));
        return wrapper;
      },
      hl_ctrl_proxy_clash: () => {
        const btn = createBtn('操作', async () => {
          dealResponse(await hl_utils.sendNativeMessage('clash_opt'));
        });
        setTimeout(() => {
          btn.insertAdjacentHTML('afterend',
          `<a style="margin-left:8px" href="http://127.0.0.1:9090/ui/#/rules" target="_blank">监控</a>`);
        }, 100);
        return btn;
      },
      top: () => {
        const btn = createBtn('top-kill', async () => {
          dealResponse(await hl_utils.sendNativeMessage('top-kill'));
        });
        setTimeout(() => {
          btn.insertAdjacentHTML('beforebegin',
          `重启电脑查看 ps aux | grep ttyd`);
        }, 100);
        return btn;
      },
      operateTabs: () => operateTabs(storage),
    };
    const setTips = (key) => {
      const result = tips[key]?.();
      if (ctrlEle.nextElementSibling.classList.contains('msg')) {
        ctrlEle.nextElementSibling.innerHTML = '';
        if (typeof result === 'string') {
          ctrlEle.nextElementSibling.innerHTML = result;
        } else if (result) {
          ctrlEle.nextElementSibling.appendChild(result);
        }
      }
    };
    // console.log('nextElementSibling: ', ctrlEle.nextElementSibling, ctrlEle.nextElementSibling.classList.contains('msg'));
    if (isInit) {
      if (storage[storageField]) {
        // 设置 active 初始态、显示相应 msg
        const btn = ctrlEle.querySelector(`#${storage[storageField]}`);
        btn?.classList.add('active');
        setTips(btn?.id);
      }
    } else if (btnEle) {
      ctrlEle.querySelectorAll('button').forEach(item => item.classList.remove('active'));
      btnEle.classList.add('active');
      setTips(btnEle.id);
      if (
        storageField === proxyListPrefix
        && btnEle.id?.startsWith(proxyListPrefix)
        || storageField !== proxyListPrefix
        && storageField
      ) {
        // 只记忆 proxyList 的按钮
        await hl_utils.setStorage({ [storageField]: btnEle?.id });
      }
      let response;
      switch (btnEle.id) {
        case 'AIChat':
          const clipText = await hl_utils.readClipboardText();
          response = await chrome.runtime.sendMessage({ action: 'AIChat', clipText });
          break;
        case 'top':
        case 'operateTabs':
          response = await hl_utils.sendNativeMessage(btnEle.id);
          break;
      }
      dealResponse(response);
    }
  };

  document.querySelectorAll('.controls').forEach(ctrl => {
    const storageField = ctrl.getAttribute('data-field');
    if (storageField === proxyListPrefix) {
      // 生成 proxy 控制按钮
      const htmlStr = proxyList.map(item => `<button id="${proxyListPrefix}_${item}">${item}</button>`).join('');
      ctrl.insertAdjacentHTML('beforeend', htmlStr);
    }
    activeSelect(ctrl, true);
    ctrl.addEventListener('click', async (evt) => {
      const ele = evt.target;
      switch (ele.tagName) {
        case 'BUTTON':
          activeSelect(ctrl, false, ele);
          const field = ele.id?.replace(`${proxyListPrefix}_`, '');
          if (proxyList.includes(field)) {
            // proxy 控制直接调用 native 命令
            dealResponse(await hl_utils.sendNativeMessage(field));
          }
          break;
        case 'SPAN':
        case 'A':
          clickHandle(ele.id);
          break;
      }
    });
  });
  async function clickHandle(eleId) {
    let response;
    switch (eleId) {
      case 'openMacConfig':
        response = await hl_utils.sendNativeMessage(eleId);
        break;
      case 'snapshot':
        chrome.tabs.captureVisibleTab((dataUrl) => {
          const url = dataUrl.replace(/^data:image\/[^;]+/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20image.png;');
          hl_utils.downloadBase64File(url);
        });
        break;
      case 'index':
      case 'i-popup':
        const tab = await hl_utils.getCurTab();
        const url = chrome.runtime.getURL(`${eleId}.html`);
        chrome.tabs.create({ url, index: tab.index + 1 });
        break;
      case 'createWindow':
        const winds = await chrome.windows.getAll();
        winds.forEach(win => {
          if (win.type === 'popup') {
            chrome.windows.remove(win.id);
          }
        });
        console.log('log winds: ', winds);
        const wind = await chrome.windows.create({
          // url: ['https://google.com', 'https://x.com'],
          url: 'https://google.com',
          type: 'popup', focused: true,
          left: 120, top: 20, width: 400, height: 600,
          // state: 'fullscreen',
        });
        console.log('log wind: ', wind);
        await hl_utils.sleep(200);
        // 在 macOS 上, 延时修改 窗口位置 才能有效.
        const windup = await chrome.windows.update(wind.id, {
          drawAttention: true,
          top: 0, left: 0,
        });
        // console.log('log windup: ', windup);
        // chrome.windows.getCurrent((windc) => {
        //   chrome.windows.update(windc.id, { width: 1728 });
        // });
        break;
    }
    dealResponse(response);
  };

  const localStorage = await hl_utils.getStorage(null, false);
  const syncStorage = await hl_utils.getStorage(null);
  console.log('localStorage: ', localStorage);
  console.log('syncStorage: ', syncStorage);

  // .replaceAll('\n', '<br/>')
  const storageText = document.querySelector('#storageEle textarea');
  const removeInput = document.querySelector('#storageEle input');
  storageText.value = JSON.stringify(syncStorage, null, 2);
  storageText.addEventListener('input', async (evt) => {
    console.log('evt: ', evt);
    const tv = hl_utils.jsonParse(evt.target.value);
    if (tv) {
      await hl_utils.setStorage(tv);
    }
  });
  removeInput.addEventListener('input', async (evt) => {
    const tv = hl_utils.jsonParse(evt.target.value);
    if (tv) {
      await hl_utils.removeStorage(tv);
    }
  });

  // 获取快捷键
  const manifest = chrome.runtime.getManifest()
  document.querySelector('#cmds').innerHTML = `
  <pre>${JSON.stringify(manifest.commands, null, 2)}</pre>
  `;

  // 电源模式
  // 防止休眠或屏幕关闭 https://chrome.google.com/webstore/detail/keep-computer-awake-for-a/imbpigcghoambmanjekibelfjemnnool
  const powerMode = localStorage?.hl_power || 'default';
  document.querySelectorAll('#powerOps input[type="radio"]').forEach(item => {
    if (item.getAttribute('value') === powerMode) {
      item.setAttribute('checked', true);
    }
    item.addEventListener('change', async function(e) {
      // console.log('ee', e.target);
      switch (e.target.value) {
        case 'display':
        case 'system':
          chrome?.power?.requestKeepAwake(e.target.value);
          await hl_utils.setStorage({ hl_power: e.target.value });
          break;
        default:
          chrome?.power?.releaseKeepAwake();
          await hl_utils.setStorage({ hl_power: '' });
          break;
      }
    });
    // chrome.power.reportActivity(() => {
    //   console.log('reportActivity');
    // });
  });
})();
