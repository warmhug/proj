const hl_uiUtils = {
  injectStyles: (cssText, id) => {
    if (id) {
      const isExist = document.querySelector([`data-hl-style-id=${id}`]);
      if (isExist) {
        return;
      }
    }
    const style = document.createElement('style');
    style.textContent = cssText;
    document.head.appendChild(style);
  },
  logger: function () {
    if (typeof console !== "undefined" && console.log) {
      try {
        console.log.apply(null, arguments);
      } catch (error) {
        // on Mobile maybe throw "TypeError: Illegal invocation"
      }
    }
    var args = Array.prototype.slice.call(arguments);
    var ele = document.getElementById("loger");
    ele.style.cssText =
      "position:fixed;z-index:99999;left:0;top:0;background:rgba(0,0,0,.5);color:#fff;padding:5px";
    ele.innerHTML += "<br /><br />" + args.join(" ");
  },
  // MutationObserver  ResizeObserver  https://web.dev/i18n/en/resize-observer/
  // 使用 Performance https://web.dev/i18n/en/cls/ 监测异步 js 延迟渲染的 dom 元素稳定出现时间，不准确。
  // window.addEventListener('load', () => {
  //   cls(() => {
  //     // console.log('log cls', location.href, document.body.clientHeight, document.body.scrollHeight);
  //   });
  // });
  cls: function (cb = () => {}) {
    let clsValue = 0, clsEntries = [], sessionValue = 0, sessionEntries = [];
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          const firstSessionEntry = sessionEntries[0];
          const lastSessionEntry = sessionEntries[sessionEntries.length - 1];
          if (sessionValue &&
              entry.startTime - lastSessionEntry.startTime < 1000 &&
              entry.startTime - firstSessionEntry.startTime < 5000) {
            sessionValue += entry.value;
            sessionEntries.push(entry);
          } else {
            sessionValue = entry.value;
            sessionEntries = [entry];
          }
          if (sessionValue > clsValue) {
            clsValue = sessionValue;
            clsEntries = sessionEntries;
            cb();
          }
        }
      }
    }).observe({type: 'layout-shift', buffered: true});
  },
  copyStr: function (event) {
    // <textarea></textarea>
    var copyTextarea = document.querySelector('textarea');
    copyTextarea.select();
    try {
      var successful = document.execCommand('copy');
      console.log('Copying command ' + successful ? 'successful' : 'unsuccessful');
    } catch (err) {
      console.log('unable to copy');
    }
  },
  // 用于 Chrome 浏览器插件里，检测并等待飞书文档的标题出现
  feishuDocsJs: function () {
    const checkEle = (selector, cb = () => {}) => {
      let ele, timeout = 8000, startTime = Date.now();
      const check = () => {
        ele = document.querySelector(selector);
        if (!ele && Date.now() - startTime < timeout) {
          setTimeout(check, 200);
        } else if (ele) {
          cb(ele);
        }
      };
      check();
    };
    if (window !== top) {
      checkEle('.suite-title-input', (ele) => {
        window.postMessage(JSON.stringify({
          _url: location.href,
          title: ele.innerHTML,
        }), '*');
      });
    }
  },
  // createSearchSwitch('https://www.google.com/search?q=ss&sca_esv=bb');
  // createSearchSwitch('https://bing.com/search?q=js&ac=b')
  // createSearchSwitch('https://www.baidu.com/s?wd=js')
  createSearchSwitch: function (url) {
    const createContainer = () => {
      const container = document.createElement('div');
      container.setAttribute('data-flag', 'hl_search');
      container.style.cssText = 'position: fixed; right: 500px; top: 4px; z-index: 9988; opacity: 0.3;';
      document.body.append(container);
      return container;
    }
    const createLink = (container, href, text) => {
      const ele = document.createElement('a');
      ele.href = href;
      ele.innerText = text;
      ele.style.cssText = 'text-decoration: none; margin-right: 10px';
      container.appendChild(ele);
    }
    const urlObj = new URL(url || location.href);
    const searchEngines = ['google.com', 'bing.com', 'baidu.com'];
    const searchEngineNames = ['Goog', 'Bing', 'BD'];
    const createHref = (matchTxt, query) => 'https://www.' + matchTxt + '?' + query;
    // console.log('run search', urlObj.pathname);
    if (['/', '/search'].includes(urlObj.pathname) && urlObj.host.endsWith(searchEngines[0])) {
      const query = urlObj.searchParams.get('q') || '';
      const container = createContainer();
      createLink(container, createHref(searchEngines[1] + '/search', 'q=' + query), searchEngineNames[1]);
      createLink(container, createHref(searchEngines[2] + '/s', 'wd=' + query), searchEngineNames[2]);
    } else if (['/', '/search'].includes(urlObj.pathname) && urlObj.host.endsWith(searchEngines[1])) {
      const query = urlObj.searchParams.get('q') || '';
      const container = createContainer();
      createLink(container, createHref(searchEngines[0] + '/search', 'q=' + query), searchEngineNames[0]);
      createLink(container, createHref(searchEngines[2] + '/s', 'wd=' + query), searchEngineNames[2]);
    } else if (['/', '/s'].includes(urlObj.pathname) && urlObj.host.endsWith(searchEngines[2])) {
      const query = urlObj.searchParams.get('wd') || '';
      const container = createContainer();
      createLink(container, createHref(searchEngines[0] + '/search', 'q=' + query), searchEngineNames[0]);
      createLink(container, createHref(searchEngines[1] + '/search', 'q=' + query), searchEngineNames[1]);
    }
  },
  videoSpeedController: (videoSpeed = 2, onChange = async (arg) => {}) => {
    // 参考 Video Speed Controller https://chromewebstore.google.com/detail/nffaoalbilbmmfgbnbgppjihopabppdk
    // 测试地址 https://shapeshed.com/examples/HTML5-video-element/
    const changeEvt = async (speed = videoSpeed) => {
      video.playbackRate = speed;
      await onChange(video.playbackRate);
    };
    const initCtrl = (video) => {
      const rect = video.getBoundingClientRect();
      const offsetRect = video.offsetParent?.getBoundingClientRect();
      const top = Math.max(rect.top - (offsetRect?.top || 0), 0);
      const left = Math.max(rect.left - (offsetRect?.left || 0), 0);
      const input = document.createElement('input');
      input.setAttribute('name', 'hl_video_controller');
      input.setAttribute('type', 'number');
      input.setAttribute('step', '0.2');
      input.setAttribute('min', '0.2');
      input.style.cssText = `position: absolute; z-index: 9988; opacity: 0.3; width: 50px; height: 20px; top: ${top}px; left: ${left}px;`;
      // 设置初始值
      input.value = video.playbackRate !== 1 ? video.playbackRate.toFixed(2) : videoSpeed;
      video.playbackRate = Number(input.value);
      let newSpeed = video.playbackRate;
      video.addEventListener('loadeddata', async () => {
        // 视频地址变化时
        // console.log('视频数据已加载:', videoElement.src);
        await changeEvt(newSpeed);
      });
      input.addEventListener('change', async (evt) => {
        newSpeed = Number(evt.target.value);
        await changeEvt(newSpeed);
      });
      video.parentElement.insertBefore(input, video.parentElement.firstChild);
      return input;
    }
    document.querySelectorAll('video').forEach(item => {
      const input = initCtrl(item);
      input.parentElement.addEventListener('mouseenter', () => {
        input.style.display = 'block';
      });
      input.parentElement.addEventListener('mouseleave', () => {
        input.style.display = 'none';
      });
    });
  },
  modalBs: function ({
    content,
    onOpen = () => {}, onClose = () => {},
  }) {
    const modalTemp = `
      <div class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
          </div>
        </div>
      </div>
    `;
    const css = `
      .fade {
        opacity: 0;
        transition: opacity .15s linear;
      }
      .fade.in {
        opacity: 1;
      }
      .modal-open {
        overflow: hidden;
      }
      .modal {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1050;
        display: none;
        overflow: hidden;
        outline: 0;
      }
      .modal.fade .modal-dialog {
        transition: transform .3s ease-out;
        transform: translate(0, -25%);
      }
      .modal.in .modal-dialog {
        transform: translate(0, 0);
      }
      .modal-open .modal {
        overflow-x: hidden;
        overflow-y: auto;
      }
      .modal-dialog {
        position: relative;
        width: auto;
        margin: 30px auto;
      }
      .modal-content {
        position: relative;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #999;
        border: 1px solid rgba(0, 0, 0, .2);
        border-radius: 6px;
        outline: 0;
        box-shadow: 0 3px 9px rgba(0, 0, 0, .5);
      }
      .modal-backdrop {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1040;
        background-color: #000;
      }
      .modal-backdrop.fade {
        opacity: 0;
      }
      .modal-backdrop.in {
        opacity: .5;
      }
      .modal-lg {
        width: 900px;
      }
    `;
    this.injectStyles(css);
    const modalWrapper = document.createElement('div');
    modalWrapper.innerHTML = modalTemp;
    const modal = modalWrapper.querySelector('.modal');
    document.body.appendChild(modalWrapper);
    modal.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) {
        toggleModal(false);
      }
    });
    let modalBackdrop;
    const toggleModal = (isOpen) => {
      if (isOpen) {
        modalBackdrop = document.createElement('div');
        modalBackdrop.classList.add('modal-backdrop', 'fade', 'in');
        modal.style = 'display: block;';
        modal.classList.add('in');
        document.body.classList.add('modal-open');
        document.body.append(modalBackdrop);
      } else {
        modal.style = 'display: none;';
        modal.classList.remove('in');
        document.body.classList.remove('modal-open');
        modalBackdrop?.remove();
      }
    };
    let openState = false;
    document.body.addEventListener('dblclick', () => {
      openState = !openState;
      toggleModal(openState);
      openState ? onOpen() : onClose();
    });
    modal.querySelector('.modal-content').innerHTML = content;
    return {
      modal,
      toggleModal,
      openState,
    }
  },
  modalGpt: function () {
    let modalsInitialized = new Set();  // 用 Set 来标记已经初始化的 modal
    const defaultContainer = document.body;
    const self = this;
    function createModal(modalId, {
      container = defaultContainer, title = '', content = '',
      onOpen = () => {}, onClose = () => {},
    }) {
      // 防止同一个 modal 被多次初始化
      if (modalsInitialized.has(modalId)) {
        return;
      }
      const html = `
      <dialog id="${modalId}">
        <div class="modal-header">
          <h3>${title}</h3>
          <span class="close-btn">&times;</span>
        </div>
        <div class="modal-content">${content}</div>
      </dialog>
      `;
      let newContainer = container;
      if (container === defaultContainer) {
        newContainer = document.createElement('div');
        defaultContainer.appendChild(newContainer);
      }
      newContainer.innerHTML = html;
      self.injectStyles(`
        dialog {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: none;
          padding: 20px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
          width: 80%;
          max-width: 500px;
        }
        dialog::backdrop {
          background-color: rgba(0, 0, 0, 0.5);
        }
        .modal-content {
          position: relative;
        }
        .close-btn {
          position: absolute;
          top: 10px;
          right: 15px;
          font-size: 24px;
          cursor: pointer;
        }
      `, modalId);
      const dialog = newContainer.querySelector('dialog');
      const closeButton = newContainer.querySelector('close-btn');
      closeButton.addEventListener('click', () => {
        dialog.close();
        onClose();
      });
      dialog.addEventListener('click', (event) => {
        if (event.target === dialog) {
          dialog.close();
          onClose();
        }
      });
      modalsInitialized.add(modalId);  // 标记该 modal 已经初始化
      // 返回的控制 Modal 的函数
      return {
        openModal: () => dialog.show(),
        closeModal: () => dialog.close(),
        toggleModal: () => {
          if (dialog.open) {
            dialog.close();
          } else {
            dialog.show();
          }
        }
      };
    }
    return createModal;
  },
  confirm: function (html = '', closeTime = 0) {
    // 原生 alert confirm 框 能显示的 字符数量 较少
    let [res, rej] = []
    const promise = new Promise((resolve, reject) => {
      [res, rej] = [resolve, reject];
    });
    // console.log('[res, rej]: ', [res, rej]);
    const container = document.createElement('div');
    container.id = 'hl_alert';
    container.style.cssText = 'display:block; position:fixed; z-index:999; top:50%; left:50%; transform:translate(-50%, -50%); background-color:white; padding:20px; border:1px solid black;';
    container.style.display = 'block';
    const content = document.createElement('div');
    content.innerHTML = html;
    const footer = document.createElement('div');
    footer.addEventListener('click', (evt) => {
      if (evt.target.id == 'ok') {
        res(true);
      }
      if (evt.target.id == 'cancel') {
        res(false);
        // rej(false);
      }
      // container.style.display = 'none';
      container.remove();
    });
    footer.innerHTML = `
    <button id="ok">确定</button>
    <button id="cancel">取消</button>
    `
    container.appendChild(content);
    container.appendChild(footer);
    if (closeTime) {
      setTimeout(() => {
        container.remove();
      }, closeTime);
    }
    if (!document.querySelector(`#${container.id}`)) {
      document.body.appendChild(container);
    }
    return promise;
  },
  // ulList([{ text: 'test', onClick: () => {}, onClose: () => {} }], document.body, true)
  ulList: (listData, container, showClose = true) => {
    const ulList = container || document.createElement('div');
    listData.forEach((item, index) => {
      const li = document.createElement('span');
      li.textContent = item.text;
      li.style.cssText = 'display: inline-block; margin: 6px 4px; padding: 2px 8px;';
      const deleteBtn = document.createElement('b');
      deleteBtn.style.cssText = 'cursor: pointer; color: gray; margin-left: 6px; font-size: 12px; vertical-align: top';
      deleteBtn.innerHTML = '&times;';
      deleteBtn.onclick = () => {
        item?.onClose(index);
      };
      if (showClose) {
        li.appendChild(deleteBtn);
      }
      li.onclick = () => {
        li.parentNode.querySelectorAll('span').forEach(item => {
          console.log(item.textContent);
          item.style.background = null;
        });
        li.style.background = '#bee5be';
        item?.onClick(index);
      };
      ulList.appendChild(li);
    });
    return ulList;
  },
  // 双击事件 被 选中 文字占用，这里实现三击事件
  addTripleClickEvent: function (element, callback, timeout = 500) {
    if (!element || typeof callback !== 'function') {
      throw new Error('请提供有效的元素和回调函数');
    }
    let clickCount = 0;
    let clickTimer = null;
    element.addEventListener('click', () => {
      clickCount++;
      // 如果是第一次点击，启动一个定时器
      if (clickCount === 1) {
        clickTimer = setTimeout(() => {
          clickCount = 0;
          clickTimer = null;
        }, timeout);
      }
      // 如果达到三击，触发回调
      if (clickCount === 3) {
        clearTimeout(clickTimer);
        clickCount = 0;
        clickTimer = null;
        callback();
      }
    });
  },
  resizer: function (dragerXSelctor = '#resizerX', leftEleSelctor = '#sideIframe') {
    // https://stackoverflow.com/a/58965134/2190503
    // https://stackoverflow.com/a/33523184/2190503
    // 左右拖动 设置左边元素宽度
    const dragerX = document.querySelector(dragerXSelctor);
    const leftEle = document.querySelector(leftEleSelctor);
    if (!dragerX || !leftEle) {
      return;
    }
    const mousemove = (evt) => {
      // return;
      leftEle.style.width = `${evt.pageX}px`;
    };
    dragerX.onmousedown = function () {
      document.documentElement.addEventListener('mousemove', doDrag, false);
      document.documentElement.addEventListener('mouseup', stopDrag, false);
    }
    const doDrag = function (evt) {
      if (evt.which != 1) {
        console.log("mouseup");
        stopDrag(evt);
        return;
      }
      // 解决 拖动元素内部 有 iframe 时 拖动卡顿 问题
      document.querySelectorAll('iframe').forEach(item => {
        item.style.pointerEvents = 'none';
      });
      mousemove(evt);
    }
    const stopDrag = async function (evt) {
      // console.log("stopDrag(evt)");
      document.documentElement.removeEventListener('mousemove', doDrag, false);
      document.documentElement.removeEventListener('mouseup', stopDrag, false);
      document.querySelectorAll('iframe').forEach(item => {
        item.style.pointerEvents = 'auto';
      });
      const saveWidth = `${leftEle.offsetWidth / (window.innerWidth - 12) * 100}%`;
      await hl_utils.setStorage({ hl_other_sideWidth: saveWidth });
    }
  },
  createIframe: function () {
    const defaultHtml = `<!DOCTYPE html><html>
    <head><meta charset="utf-8" /></head>
    <body>default...</body>
    </html>`;
    const ifrElement = document.createElement('iframe');
    function writeContent(finalHtml = defaultHtml) {
      const ifaDom = ifrElement.contentDocument || ifrElement.contentWindow?.document;
      if (!ifaDom) {
        return;
      }
      ifaDom.open();
      // console.log('log finalHtml: ', finalHtml);
      // 向 iframe 元素里写入 html
      ifaDom.write(finalHtml);
      ifaDom.close();
    }
    // document.body.appendChild(ifrElement);
    // 注意: 需要先插入文档, 才能操作
    // writeContent(finalHtml);
    return { ifrElement, defaultHtml, writeContent };
  },
  createDomByStr: function (
    htmlString = '<p>Hello, World!</p>',
  ) {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = htmlString;
    const ele = tempElement.firstChild; // 获取第一个 div 元素
    // console.log('log ele: ', ele);
    return ele;
  },
  createBtn: function(txt = '', clickFn = async () => {}) {
    const btn = document.createElement('button');
    btn.innerHTML = txt;
    btn.addEventListener('click', clickFn);
    return btn;
  },
};

const hl_commonUtils = {
  asyncMap: async function (arr, callback = async () => {}) {
    const res = await Promise.all(arr.map(async (item, index) => {
      try {
        return await callback(item, index);
      } catch (error) {
        return { error };
      }
    }));
    return res;
  },
  getNow: () => {
    const now = new Date();
    return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}_${now.getHours()}-${now.getMinutes()}`;
  },
  sleep: (ms) => new Promise(resolve => {
    setTimeout(resolve, ms);
  }),
  jsonParse: function (objStr) {
    let res;
    try {
      res = JSON.parse(objStr);
    } catch (error) {
      console.log('JSON.parse error: ', error);
    }
    return res;
  },
  downloadBase64File: function (base64String, fileName) {
    // const linkSource = `data:${contentType};base64,${base64Data}`;
    const downloadLink = document.createElement("a");
    downloadLink.href = base64String;
    downloadLink.download = fileName || this.getNow() + '.jpeg';
    downloadLink.click();
  },
  debounce: (fn, delay) => {
    var timer = null;
    return function() {
      var context = this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function() {
        fn.apply(context, args);
      }, delay);
    };
  },
  compareUrl: function (ua, ub, defaultOptions = {}) {
    const options = {
      matchOrigin: false,
      matchOriginPathname: false,
      ...defaultOptions,
    }
    const urla = new URL(ua);
    const urlb = new URL(ub);
    if (options.matchOrigin) {
      return urla.origin === urlb.origin;
    } else if (options.matchOriginPathname) {
      return urla.origin === urlb.origin && urla.pathname === urlb.pathname;
    }
    return ua = ub;
  },
  // get local ip https://github.com/dlo83/local-ip-chrome-extension
  getLocalIPs: (callback) => {
    var ips = [];
    var RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection;
    var pc = new RTCPeerConnection({ iceServers: [] });
    pc.createDataChannel('');
    pc.onicecandidate = function (e) {
      if (!e.candidate) { // Candidate gathering completed.
        pc.close();
        callback(ips);
        return;
      }
      var ip = /^candidate:.+ (\S+) \d+ typ/.exec(e.candidate.candidate)[1];
      if (ips.indexOf(ip) == -1) // avoid duplicate entries (tcp/udp)
        ips.push(ip);
    };
    pc.createOffer(function (sdp) {
      pc.setLocalDescription(sdp);
    }, function onerror() { });
  },
  readClipboardText: async () => {
    // https://github.com/extend-chrome/clipboard/blob/master/src/index.ts
    const readText = () => new Promise((resolve, reject) => {
      // Create hidden input to receive text
      const el = document.createElement('textarea');
      el.value = 'before paste';
      document.body.append(el);
      el.select();
      const success = document.execCommand('paste');
      // console.log('document.execCommand result: ', success);
      const text = el.value;
      el.remove();
      if (!success) reject(new Error('Unable to read from clipboard'));
      resolve(text);
    });
    const writeText = (text) => new Promise((resolve, reject) => {
      // Create hidden input with text
      const el = document.createElement('textarea')
      el.value = text
      document.body.append(el)
      // Select the text and copy to clipboard
      el.select()
      const success = document.execCommand('copy')
      el.remove()
      if (!success) reject(new Error('Unable to write to clipboard'))
      resolve(text)
    });
    let text = '';
    try {
      /**
        // need to add clipboard/clipboardWrite/clipboardRead to manifest
        // https://developer.chrome.com/docs/extensions/reference/clipboard/
        console.log('chrome.clipboard', chrome.clipboard);
        chrome.clipboard.onClipboardDataChanged.addListener(() => {
          const success = document.execCommand('paste');
          console.log('document.execCommand result1: ', success);
        });
      */
      if (chrome?.clipboard) {
        // https://developer.chrome.com/docs/apps/reference/clipboard
        // chrome app 里可以获取 clipboard 但插件里不支持
        text = await chrome.clipboard.readText();
        console.log('clipboard from chrome: ', text);
      }
      if (!text) {
        // DOMException: Document is not focused.
        text = await navigator.clipboard.readText();
        console.log('clipboard from navigator: ', text);
      }
    } catch (error) {
      console.log('hl readClipboardText custom', error);
      text = await readText();
    } finally {
      console.log('hl readClipboardText finally', text);
    }
    // console.log('hl readClipboardText', text);
    return text;
  },
  requestPersistentStorage: async function () {
    navigator.storage.estimate().then(estimate => {
      console.log(`已使用存储空间: ${estimate.usage}`);
      console.log(`可用存储空间: ${estimate.quota}`);
    });
    const isPersisted = await navigator.storage.persisted();
    if (!isPersisted) {
      const result = await navigator.storage.persist();
      if (result) {
        console.log("持久化权限已授予");
      } else {
        console.log("持久化权限请求被拒绝");
      }
    } else {
      console.log("持久化权限已经启用");
    }
  },
  // 打开或创建一个 IndexedDB 数据库
  openDatabase: async function (dbName = 'fileHandlesDB', dbTable = 'fileHandles') {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName, 1);
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        db.createObjectStore(dbTable, { keyPath: "id" });
      };
      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction(dbTable, 'readwrite');
        const objectStore = transaction.objectStore(dbTable);
        resolve([objectStore, transaction, db]);
        // transaction.oncomplete = function() {
        // }
      };
      request.onerror = (event) => {
        console.error('打开数据库出错：', event.target.error);
        reject(event.target.error);
      };
    });
  },
  // FileHandle 需要通过 IndexedDB 来存储
  fileHandleOpt: function () {
    const saveFileHandle = async (id, fileHandle, filePath) => {
      if (!id || !fileHandle) {
        return;
      }
      const [store] = await this.openDatabase();
      const request = store.put({ id, fileHandle, filePath });
      return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
      });
    }
    const getFileHandle = async (id) => {
      const [store] = await this.openDatabase();
      const request = id ? (await store.get(id)) : (await store.getAll());
      return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
      });
    }
    const deleteFileHandle = async (id) => {
      const [store] = await this.openDatabase();
      const request = id ? (await store.delete(id)) : (await store.clear());
      return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
      });
    }
    return { saveFileHandle, getFileHandle, deleteFileHandle };
  },
  fileReader: async function (fileArg, streamRead) {
    try {
      let file = fileArg;
      if (!file) {
        const [fileHandle] = await window.showOpenFilePicker();
        file = await fileHandle.getFile();
      }
      if (!streamRead) {
        const contents = await file.text();
        // console.log('contents: ', contents);
        return contents;
      } else {
        await streamReader(file);
      }
    } catch (err) {
      console.error("fileReader 报错", err);
    }
    async function streamReader(file) {
      // 按块读取文件的方式，特别适合处理大文件时逐步读取，避免一次性读取整个文件占用太多内存
      const reader = file.stream().getReader();
      let decoder = new TextDecoder(); // 用于解码文本数据
      let { done, value } = await reader.read();
      while (!done) {
        // 将二进制数据转换为文本
        let chunk = decoder.decode(value, { stream: true });
        console.log('读取的块:', chunk);
        ({ done, value } = await reader.read());
      }
    }
  },
};

const hl_chromeUtils = {
  sendNativeMessage: (() => {
    let port = null;
    function connect(name) {
      // 双向通信
      port = chrome.runtime.connectNative(name);
      port.onMessage.addListener((message) => {
        console.log('Received message from native: ', message);
      });
      port.onDisconnect.addListener((p) => {
        console.log('Disconnected', chrome.runtime.lastError);
        port = null;
      });
    }
    async function sendMessage(message, content) {
      // 单向通信
      let response;
      try {
        response = await chrome.runtime.sendNativeMessage('nm_sh', {
          message,
          content,
        });
        console.log('sendNativeMessage 接收到消息:', response);
      } catch (error) {
        console.log('sendNativeMessage error: ', error, error.name);
        response = { code: '304', error: error.message };
      }
      return response;
      connect('nm_sh');
      port.postMessage({ message });
    }
    return sendMessage;
  })(),
  // <a href="chrome://settings/system">chrome-proxy</a>
  // aEle.addEventListener('click', openChromeUrl);
  openChromeUrl: function (evt) {
    evt.preventDefault();
    const url = evt.target.getAttribute('href');
    if (url) {
      chrome.tabs.create({ url });
    }
  },
  getCurTab: async function () {
    const [curTab] = await chrome.tabs.query({ active: true });
    return { ...curTab };
  },
  getCookies: async function (domain) {
    if (!domain) {
      const curTab = await this.getCurTab();
      domain = new URL(curTab.url).hostname;
    }
    const cookies = await chrome.cookies.getAll({ domain });
    console.log('log cookies: ', cookies);
  },
  // 判断 popup.html 页面是在 浏览器扩展弹窗里打开 or 是独立的 tab 页面打开
  isPopup: async function () {
    // 通过 outerWidth outerHeight 可以判断
    // console.log('log window: ', window.opener, window.location.href);
    // console.log('log window: ', window.outerWidth, window.outerHeight);
    // 通过 manifest.json 里设置参数 可以判断
    // "action": {
    //   "default_popup": "i-popup.html?context=popup",
    // },
    const urlParams = new URLSearchParams(window.location.search);
    const context = urlParams.get('context');
    // console.log('log context: ', context);
    const inPopup = context === 'popup';
    return inPopup;
  },
  // 检测 url 对应的 tab ，如果不存在 则创建，如果存在 则 reload 激活，并轮询获得网页 loaded 状态
  createOrUpdateTab: async (targetUrl, strictMatch = fasle) => {
    // 'chrome-extension://kafpfdegkmheageeldelgnnkegpkbpca/blank.html' can't be query. 比如 chrome://newtab/
    const tabs = await chrome.tabs.query({});
    let targetTab = tabs.find((tab) => {
      return new URL(tab.url).hostname === new URL(targetUrl).hostname;
    });
    if (!targetTab) {
      targetTab = await chrome.tabs.create({ url: targetUrl, active: true });
    } else {
      if (strictMatch && targetTab.url !== targetUrl) {
        console.log('log before update targetId: ', targetTab.id);
        // 注意：update 后，产生了新的 tab 信息
        targetTab = await chrome.tabs.update(targetTab.id, { url: targetUrl },
          // 如果有回调，await 返回值为 undefined
          // function (updatedTab) {
          //   console.log('log updatedTab: ', updatedTab);
          //   const intervalId = setInterval(() => {
          //     chrome.tabs.get(updatedTab.id, function (tab) {
          //       console.log('log tab: ', tab);
          //       if (tab.pendingUrl === tab.url || tab.url == targetUrl) {
          //         console.log('Navigation completed!');
          //         clearInterval(intervalId);
          //       }
          //     });
          //   }, 50);
          // }
        );
        console.log('log after update targetId: ', targetTab?.id);
      } else {
        // status complete 只表示 页面 初始化完成 但页面内容的资源可能没有 onload
        // chrome.tabs.reload 和 update 很快会结束，指的是 tab 的变化、跟页面内容无关
        // 注意，如果先调用了 update 不应该再立即调用 reload
        console.log('log tabs.reload: ', tabs.reload);
        await chrome.tabs.reload(targetTab.id);
      }
    }
    console.log('log tab status: ', targetTab.status);
    if (targetTab.status !== 'complete') {
      await new Promise(resolve => {
        let interval;
        interval = setInterval(() => {
          chrome.tabs.get(targetTab.id, function (tab) {
            if (chrome.runtime.lastError) {
              console.log('log lastError.message: ', chrome.runtime.lastError.message);
              clearInterval(interval);
              return;
            }
            console.log('log targetTab.status setInterval: ',
              targetTab.id === tab.id, targetTab.status, tab.status);
            if (tab.status === 'complete') {
              clearInterval(interval);
              targetTab = tab;
              interval = null;
              resolve();
            }
          });
        }, 500);
        setTimeout(() => {
          // 超时清除
          console.log('log timeout clearInterval: ', interval);
          if (interval) {
            clearInterval(interval);
            resolve();
          }
        }, 60000);
      });
    }
    console.log('log targetTab return: ', targetTab);
    return targetTab;
  },
  // 如果在 popup 页面 调用 tabs.remove /
  // 会立即关闭，不能再运行后续代码，所以逻辑要放到 background 里
  reCreateTabsDelay: async (urls = []) => {
    const tabsAll = await chrome.tabs.query({});
    const tabs = tabsAll.filter(tab => urls.includes(tab.url));
    // const tabs = await chrome.tabs.query({ url: urls });
    // console.log('tabs: ', tabs);
    await chrome.tabs.remove(tabs.map(tab => tab.id));
    setTimeout(async () => {
      urls?.forEach(url => {
        chrome.tabs.create({ url, pinned: true });
      });
    }, 500);
  },
  reloadTabs: async (curTab) => {
    // 定时销毁和刷新页面 (解决 循环登录、被墙网站 问题) 有时因为 登录状态检测 等循环调用、导致页面假死状态，这时使用 discard 不起作用，调用 reload 也不执行。
    // 当页面本身有问题时、跟 tab 的状态无关，即这里 tab 的 url 和 status complete 都正常，discarded 也为 false，使用 chrome.tabs.discard/reload 也不解决问题。
    // await chrome.tabs.discard(curTab.id);
    // await chrome.tabs.reload();
    if (curTab) {
      const { index, active, url, pinned } = curTab;
      // await chrome.tabs.duplicate(curTab.id);
      await chrome.tabs.remove(curTab.id);
      await chrome.tabs.create({ index, active, url, pinned });
    } else {
      // 刷新所有页面
      const tabsAll = await chrome.tabs.query({});
      tabsAll.forEach((tab) => {
        chrome.tabs.reload(tab.id);
      });
    }
  },
  /*
  // pacRule.pac 文件内容
  function FindProxyForURL(url, host) {
    // SwitchyOmega https://github.com/gfwlist/gfwlist
    // var currentTime = new Date();
    // var hour = currentTime.getHours();
    // if (hour >= 9 && hour < 17) {
    //   // 在工作时间内
    //   if (shExpMatch(url, "http://internal.example.com/*")) {
    //     return "DIRECT";
    //   } else {
    //     return "PROXY proxy.example.com:8080";
    //   }
    // } else {
    //   // 非工作时间
    //   return "DIRECT";
    // }
    if (dnsDomainIs(host, ".company.net")
    || dnsDomainIs(host, ".company1.net")
    ) {
      return "SYSTEM";
    }
    if (dnsDomainIs(host, ".google.com")) {
      return "PROXY 127.0.0.1:7890";
    }
    return "DIRECT";
  }
  */
  setChromeProxy: async (curTab) => {
    const fixedConfig = {
      mode: 'fixed_servers',
      rules: {
        bypassList: ['127.0.0.1', '[::1]', 'localhost'],
        singleProxy: {
          host: '127.0.0.1', port: 7890, scheme: 'http',
        },
      },
    };
    const proxyConfig = await chrome.proxy.settings.get({'incognito': false});
    console.log('chrome.proxy proxyConfig', proxyConfig);
    const proxyOn = proxyConfig.value.mode === 'system';
    if (proxyOn) {
      const pacScript = storage.hl_other_pacScript || {
        "url": "./pacRule.pac",
        // "data": ""
      };
      await chrome.proxy.settings.set({
        value: { mode: 'pac_script', pacScript },
        scope: 'regular',
      });
    } else {
      await chrome.proxy.settings.clear({});
    }
    return proxyOn;
  },
};

const hl_utils = {
  ...hl_commonUtils,
  ...hl_uiUtils,
  ...hl_chromeUtils,
  // chrome storage 的保存内容可以是对象
  // setStorage({ hl_savedData: obj }, false);
  setStorage: async function (kv, isSync = true) {
    if (!chrome?.storage?.local) {
      Object.keys(kv).forEach(key => {
        if (typeof kv[key] === 'object') {
          localStorage.setItem(key, JSON.stringify(kv[key]));
        } else {
          localStorage.setItem(key, kv[key]);
        }
      });
      return;
    }
    // local 最大为 5m sync 最大为8k 超出报错 QUOTA_BYTES_PER_ITEM quota exceeded
    const localRes = await chrome.storage.local.set(kv);
    // console.log('local Value is set ', localRes);
    if (isSync) {
      const syncRes = await chrome.storage.sync.set(kv);
    }
    // console.log('sync Value is set ', syncRes);
  },
  // getStorage(null, false);
  // getStorage(['hl_savedData'], false);
  getStorage: async function (keys = null, isSync = true) {
    if (!chrome?.storage?.local) {
      const res = {};
      Object.keys(localStorage).forEach(key => {
        const resItem = localStorage.getItem(key);
        const parseItem = this.jsonParse(resItem);
        if (parseItem) {
          res[key] = parseItem;
        } else {
          res[key] = resItem;
        }
      });
      return res;
    }
    let res = await chrome.storage.local.get(keys);
    // console.log('local Value is get ', res);
    if (isSync) {
      res = (await chrome.storage.sync.get(keys)) || res;
    }
    // console.log('sync Value is get', res);
    return res;
  },
  removeStorage: async function (keys) {
    if (!chrome?.storage?.local) {
      if (Array.isArray(keys)) {
        keys.forEach(item => {
          localStorage.removeItem(item);
        });
      } else {
        localStorage.removeItem(keys);
      }
      return;
    }
    const localRes = await chrome.storage.local.remove(keys);
    // console.log('local Value is get ', localRes);
    const syncRes = await chrome.storage.sync.remove(keys);
    // console.log('sync Value is get', syncRes);
    return localRes || syncRes;
  },
  cron: function (time, callback = () => {}) {
    let cronLog = '';
    const self = this;
    const defaultTime = 2 * 60 * 60 * 1000;
    function cronFn(time) {
      setTimeout(async () => {
        callback();
        cronLog += `${self.getNow()} cronFn \n`;
        console.log('cronLog: ', cronLog);
        await self.setStorage({ hl_cron: cronLog }, false);
        cronFn(time || defaultTime);
      }, time || defaultTime);
    }
    setInterval(async () => {
      await self.setStorage({ hl_cron: `清除 log ${self.getNow()}` }, false);
    }, 10 * defaultTime);
    return cronFn(time);
  },
};
