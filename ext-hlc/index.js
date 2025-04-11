// 2022-01-16 from https://github.com/GoogleChrome/chrome-extensions-samples/blob/main/mv2-archive/api/bookmarks/basic/popup.js

function dumpNode(bookmarkNode, clsArg = '') {
  // console.log('cb', chrome.bookmarks);
  if (bookmarkNode.title) {
    // html 0宽字符: U+200B  U+200C  U+200D   U+FEFF  &zwnj;&ZeroWidthSpace;&#xFEFF
    let formatTitle = bookmarkNode.title
      // todo 有问题
      // .replace(/[\u200B-\u200D\uFEFF]/g, '')
    // console.log('unicode', formatTitle, formatTitle.length, formatTitle.charAt(0));
    // formatTitle = $('<div />').html(formatTitle).html().replace(/\u200C/g, '');
    // formatTitle.split('').forEach(console.log);
    formatTitle = [...formatTitle].map((item, idx) => {
      // console.log(formatTitle.charCodeAt(idx))
      const unicodeZeroSpaces = [8203, 8204, 8205, 8236, 8288, 8289, 8290, 8291, 8292, 65279];
      if (unicodeZeroSpaces.includes(formatTitle.charCodeAt(idx))) {
        return '';
      }
      return item;
    }).join('');
    // console.log('formatTitle', formatTitle);
    if (formatTitle.length > 60) {
      formatTitle = formatTitle.substring(0, 60) + '...';
    }
    var anchor = document.createElement('a');
    let iconUrl = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0iIzQyODVGNCI+PHBhdGggZD0iTTIwIDZoLThsLTItMkg0Yy0xLjEgMC0xLjk5LjktMS45OSAyTDIgMThjMCAxLjEuOSAyIDIgMmgxNmMxLjEgMCAyLS45IDItMlY4YzAtMS4xLS45LTItMi0yem0wIDEySDRWOGgxNnYxMHoiLz48L3N2Zz4=';
    if (bookmarkNode.url) {
      anchor.setAttribute('href', bookmarkNode.url);
      // chrome://bookmarks 打开控制台 查找文件夹图标 chrome://bookmarks/images/folder_open.svg
      iconUrl = chrome.runtime.getURL(`_favicon/?pageUrl=${bookmarkNode.url}`);
    }
    anchor.setAttribute('title', bookmarkNode.title);
    // anchor.setAttribute('target', '_blank');
    anchor.innerHTML = `<img src="${iconUrl}" />${formatTitle}`;
  }
  // console.log('bookmarkNode.title', bookmarkNode.title, bookmarkNode.children);
  var li = document.createElement(bookmarkNode.title ? 'li' : 'div');
  li.append(anchor);
  if (bookmarkNode?.children?.length) {
    const cls = `${clsArg}-${bookmarkNode.parentId}-${bookmarkNode.id}`;
    li.append(dumpTreeNodes(bookmarkNode.children, cls));
  }
  return li;
}
function dumpTreeNodes(bookmarkNodes, cls = 'root') {
  const ulEle = document.createElement('ul');
  ulEle.className = cls;
  var i;
  for (i = 0; i < bookmarkNodes.length; i++) {
    ulEle.append(dumpNode(bookmarkNodes[i], cls));
  }
  return ulEle;
}
async function dumpBookmarks() {
  const bookmarkTreeNodes = await chrome.bookmarks.getTree();
  const topSites = await chrome.topSites.get();
  console.log('bookmarkTreeNodes', bookmarkTreeNodes);
  console.log('topSites', topSites);
  const [favBar = [], ...others] = bookmarkTreeNodes[0].children;
  // 收藏夹栏内容 直接显示
  const newChilds = [...favBar.children, ...others, {
    id: 'top',
    parentId: 'root',
    title: 'topSite',
    children: topSites.map((item, idx) => ({ id: `t${idx}`, ...item })),
  }];
  document.querySelector('#bookmarks').append(dumpTreeNodes(newChilds));
  document.querySelector('#bookmarks').addEventListener('click', async (evt) => {
    evt.preventDefault();
    const [curTab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    const targetUrl = evt.target.href;
    if (evt.target?.tagName === 'A' && targetUrl) {
      curTab.index === 0 ? chrome.tabs.create({
        index: curTab.index + 1,
        url: targetUrl
      }) : chrome.tabs.update({ url: targetUrl });
    }
  });
  // 实现 menu 效果
  // document.querySelector('#bookmarks li').addEventListener('mouseover', (evt) => {
  //   const targetLi = evt.currentTarget;
  //   const submenu = targetLi.querySelector('ul');
  //   submenu.style.left = `-${Math.round(targetLi.offsetWidth * 1.3)}px`;
  //   submenu.style.top = '0px';
  // });
}
dumpBookmarks();

async function googleTranslate() {
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

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // console.log('ssss', request, sender, sendResponse);
    if (request._bg && request.action === 'newTranslateUrl') {
      toggleModal(true);
      setUrl(modal, request.message);
    }
    return true;
  });
}
googleTranslate();

async function content() {
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
      "sandbox_localFileEditor.html",
      "本地文件编辑器"
    ],
    [
      "https://ai-bot.cn/daily-ai-news/",
      "AI新闻"
    ],
    [
      "https://www.baidu.com/s?wd=%E6%97%A5%E5%8E%86",
      "日历"
    ],
  ];

  const { hl_other_sideWidth } = await hl_utils.getStorage();
  const sideIframe = document.querySelector('#sideIframe');
  sideIframe.style.width = hl_other_sideWidth ?? '40%';

  const sideIframeWrap = sideIframe.querySelector('.iframe-wrap');
  sideIframeWrap.innerHTML = createIfr('sandbox.html');

  const majorContent = document.querySelector('.major');
  majorContent.insertAdjacentHTML('beforeend', `
    <div class="urls-wrap">
    ${pages.map(item => {
      return `<a class="urls" style="margin:4px 8px;" href="${item[0]}">${item[1]}</a>`;
    }).join('')}
    </div>
    <div class="iframe-wrap">
      ${createIfr()}
    </div>
  `);
  const majorIframe = document.querySelector('.major .iframe-wrap');
  majorIframe.innerHTML = createIfr(pages[0][0]);
  document.querySelectorAll('.major .urls-wrap a').forEach(item => {
    item.addEventListener('click', evt => {
      evt.preventDefault();
      // const iframeWrap = evt.target.closest('.urls-wrap');
      // const curA = evt.target.closest('.urls-wrap > a');
      // const curA = evt.target.nextElementSibling;
      const curUrl = item.getAttribute('href');
      majorIframe.innerHTML = createIfr(curUrl);
    });
  });
}
content();
