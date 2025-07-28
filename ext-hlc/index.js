
async function renderMyNote() {
  const notesEle = document.querySelector('.mynotesMain');
  const renderItem = () => {
    const getRndInteger = (min, max) => Math.floor(Math.random() * (max - min) ) + min;
    const randomIndex = getRndInteger(2, resArray.length - 1);
    notesEle.innerHTML = `
      ${resArray[randomIndex] || ''}<br>
      ${resArray[randomIndex + 1] || ''}
    `;
  };
  const { hl_text_import = '' } = await hl_utils.getStorage(undefined, false);
  var resArray = hl_text_import.split('\n').filter(item => item && item != '\r');
  renderItem();
  document.querySelector('#importBtn').addEventListener('click', async () => {
    if (resArray?.length && window.confirm('使用缓存的内容？')) {
      return;
    }
    const filesHandle = await window.showOpenFilePicker({
      types: [{ description: 'Text Files', accept: { 'text/plain': ['.txt'] } }],
      multiple: true
    });
    const fileContents = await Promise.all(filesHandle.map(async (fileHandle) => {
      const file = await fileHandle.getFile();
      const contents = await file.text();
      // console.log('ccc', contents);
      return contents;
    }));
    await hl_utils.setStorage({ hl_text_import: fileContents.join() }, false);
    alert('写入本地存储成功');
  });
  notesEle.addEventListener('dblclick', (evt) => {
    evt.stopPropagation();
    evt.stopImmediatePropagation();
    renderItem();
  });
}

function googleTranslate() {
  const setUrl = (modal, url) => {
    const iframeWrap = modal.querySelector('.iframe-wrap.google');
    iframeWrap.querySelector('iframe').setAttribute('src', url);
    iframeWrap.querySelector('a').setAttribute('href', url);
    iframeWrap.querySelector('a').innerHTML = url;
  };
  const { modal, toggleModal } = hl_utils.modalBs({
    content: `
      <div class="iframe-wrap google">
        <a class="iframe-title" href="" target="_blank"></a>
        <iframe
          sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-modals allow-top-navigation allow-top-navigation-by-user-activation"
        >
        </iframe>
      </div>
    `,
    onOpen: () => {
      setUrl(modal, 'https://translate.google.com/?sl=zh-CN&tl=en&op=translate')
    },
  });

  chrome?.runtime?.onMessage?.addListener((request, sender, sendResponse) => {
    // console.log('ssss', request, sender, sendResponse);
    if (request._bg && request.action === 'newTranslateUrl') {
      toggleModal(true);
      setUrl(modal, request.message);
    }
    return true;
  });
}
async function tuiEditor({ el }) {
  const readonly = await hl_utils.isPopup();

  async function getsetNote(content) {
    if (content) {
      await hl_utils.sendNativeMessage('setNote', content);
      await hl_utils.setStorage({ hl_text_note: content }, false);
    } else {
      // return (await hl_utils.sendNativeMessage('getNote')).content;
      return (await hl_utils.getStorage(undefined, false)).hl_text_note;
    }
  }
  const initialValue = await getsetNote();

  const tuiInst = readonly ? new toastui.Editor.factory({
    el,
    initialValue,
    viewer: true,
  }) : new toastui.Editor({
    el,
    initialValue,
    initialEditType: 'wysiwyg', // markdown
    previewStyle: 'tab',  // 切换到 markdown 模式时 左上角能看到
    extendedAutolinks: true,
    autofocus: false,
    linkAttributes: { target: '_blank' },
    toolbarItems: [['italic', 'strike', 'hr', 'ul', 'ol'], ['table', 'image', 'link']],
    // height: readonly ? '450px' : '800px',
    height: '800px',
    events: {
      // change keyup 区别
      keyup: async () => {
        let content = tuiInst.getMarkdown();
        await getsetNote(content);
      }
    },
  });

  setTimeout(() => {
    tuiInst.blur?.();
    tuiInst.setScrollTop?.(0);
  }, 100);

  // 双击打开链接
  el.addEventListener('dblclick', async (evt) => {
    console.log('log tuiInst.isWysiwygMode(): ', tuiInst.isWysiwygMode?.());
    if (evt?.target?.tagName === 'A' && evt?.target?.href) {
      evt.preventDefault();
      evt.stopPropagation();
      await hl_utils.openUrl({
        // href: evt?.target?.innerText,
        href: evt?.target?.href,
        target: '_blank'
      });
    }
  });
}

async function renderBookmarks(bsData = [], topSites, extraData = []) {
  const finalData = [];
  if (bsData[0]?.children) {
    finalData.push(...bsData[0].children, bsData[1]);
  }
  if (topSites) {
    finalData.push({
      // id: 'top', parentId: 'root',
      title: 'topSite',
      children: topSites.map((item, idx) => ({ id: `t${idx}`, ...item })),
    });
  }
  finalData.push(...extraData);
  const { dumpTreeNodes } = hl_utils.createTreeDom();
  document.querySelector('#bookmarks').append(dumpTreeNodes(finalData));
  document.querySelector('#bookmarks').addEventListener('click', async (evt) => {
    if (evt.target?.tagName === 'A') {
      evt.preventDefault();
      await hl_utils.openUrl({
        href: evt.target.getAttribute('href'),
        target: evt.target.getAttribute('target') || '_blank',
      });
    }
  });
}

;(async function main() {
  const { bookmarkTreeNodes, topSites } = await hl_utils.getBookmarks();
  const ips = await hl_utils.getLocalIPs();
  renderBookmarks(bookmarkTreeNodes?.[0].children, topSites, [{
    title: `http://${ips[0]}`,
    url: `http://${ips[0]}`,
  }]);

  await renderMyNote();
  await tuiEditor({ el: document.querySelector('#tuiEditor') })
  googleTranslate();

  const createIfr = (src) => `
  <a class="iframe-title" href="${src}" target="_blank">${src ?? ''}</a>
  <iframe
    ${src ? `src="${src}"` : ''}
    sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-modals allow-top-navigation allow-top-navigation-by-user-activation"
  ></iframe>
  ${src ? '' : '<div class="tip">选择上方网址</div>'}
  `;

  hl_utils.resizer();

  const pages = [
    [
      'sandbox.html',
      'eng'
    ],
    [
      "sandbox-localEditor.html",
      "本地文件编辑器"
    ],
    [
      "https://www.baidu.com/s?wd=%E6%97%A5%E5%8E%86",
      "日历"
    ],
  ];

  const { hl_other_sideWidth } = await hl_utils.getStorage();
  const ifrContainer = document.querySelector('#iframes');
  ifrContainer.style.width = hl_other_sideWidth ?? '30%';
  ifrContainer.insertAdjacentHTML('beforeend', `
    <div class="urls-wrap">
    ${pages.map(item => {
      return `<a class="urls" style="margin:4px 8px;" href="${item[0]}">${item[1]}</a>`;
    }).join('')}
    </div>
    <div class="iframe-wrap">
      ${createIfr()}
    </div>
  `);
  const majorIframe = document.querySelector('#iframes .iframe-wrap');
  majorIframe.innerHTML = createIfr(pages[0][0]);
  document.querySelectorAll('#iframes .urls-wrap a').forEach(item => {
    item.addEventListener('click', evt => {
      evt.preventDefault();
      // const iframeWrap = evt.target.closest('.urls-wrap');
      // const curA = evt.target.closest('.urls-wrap > a');
      // const curA = evt.target.nextElementSibling;
      const curUrl = item.getAttribute('href');
      majorIframe.innerHTML = createIfr(curUrl);
    });
  });
})();
