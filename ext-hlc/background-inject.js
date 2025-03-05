
const hl_inject_ai_fns = [
  // https://www.doubao.com/chat/
  (clipText) => {
    if (!clipText) return;
    // alert(2);
    const input = document.querySelector('.semi-input-textarea-wrapper textarea');
    input.focus();
    input.value = clipText;
    // input.dispatchEvent(new Event('change'));
    input.dispatchEvent(new Event('input', { bubbles: true }));
    console.log('log doubao', input, hl_utils);
    hl_utils.sleep(500).then(() => {
      document.querySelector('.send-btn-wrapper button').dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
  },
  // https://chatgpt.com/
  (clipText) => {
    if (!clipText) return;
    // alert(4);
    const input = document.querySelector('#prompt-textarea');
    input.innerHTML = clipText;
    console.log('log gpt: ', input, hl_utils);
    hl_utils.sleep(500).then(() => {
      document.querySelector('[data-testid="send-button"]').dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
  },
  // https://kimi.moonshot.cn/
  async (clipText) => {
    if (!clipText) return;
    // alert(3);
    const selection = window.getSelection();
    document.activeElement?.blur();
    selection.removeAllRanges();
    await hl_utils.sleep(500);
    // selection.isCollapsed 为 true 是未选择
    // const editableArea = document.querySelector('[contenteditable]');
    const editableArea = document.querySelector('[data-testid="msh-chatinput-editor"]');
    // 字节监控代码 会阻止 调用 dispatchEvent input change 事件
    // https://apm.volccdn.com/mars-web/apmplus/web/browser.cn.js?aid=0&globalName=apmPlus
    editableArea.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    // console.log('editableArea: ', editableArea);
    // editableArea.select();
    await hl_utils.sleep(800);
    if (document.queryCommandSupported('insertText')) {
      document.execCommand('selectAll', false, null); // 全选现有的内容
      document.execCommand('delete', false, null);   // 删除全选的内容
      document.execCommand('insertText', false, clipText);
      // console.log("自动输入到了 contenteditable 里", editableArea.innerHTML);
    } else {
      alert("Your browser does not support insertText command");
    }
    await hl_utils.sleep(500);
    console.log('log moonshot: ', sleep);
    document.querySelector('#send-button')
      .dispatchEvent(new MouseEvent('click', { bubbles: true }));
  },
  // company ai
  (clipText) => {
    if (!clipText) return;
    // alert(1);
    const input = document.querySelector('.rc-textarea');
    input.focus();
    input.value = clipText;
    // input.dispatchEvent(new Event('change'));
    input.dispatchEvent(new Event('input', { bubbles: true }));
    console.log('log company: ', input);
    document.querySelector('.mx-auto [data-state] .rounded-lg.cursor-pointer').dispatchEvent(new MouseEvent('click', { bubbles: true }));
  },
];

const hl_inject_auto_params = [
  // https://cn.bing.com  https://www.bing.com
  // https://www.google.com  https://www.baidu.com
  {
    func: () => {
      hl_utils.createSearchSwitch();
      window.addEventListener('popstate', function (event) {
        const searchParams = new URLSearchParams(window.location.search);
        // console.log('URL search parameters changed:', searchParams);
        hl_utils.createSearchSwitch();
      });
    },
  },
  // https://www.zhihu.com
  {
    css: `
      .AppHeader.is-fixed {
        position: static;
      }
    `,
  },
  // https://i.mi.com/note/h5#/
  {
    css: `
      #folderList {
        width: 100px;
      }
    `,
    func: () => {
      setTimeout(() => {
        const linkEle = document.getElementById('pm-container')?.querySelectorAll('.ltr-element');
        linkEle?.forEach((item) => {
          // console.log('linkele', linkEle);
          item.addEventListener('dblclick', (evt) => {
            var text = evt.target.innerText;
            console.log(text);
            text.split(' ').forEach(http => {
              if (http.startsWith('http')) {
                window.open(http);
              }
            });
          });
        });
      }, 800);
    },
  },
  // comp note
  {
    css: `
      #main-root [data-testid="beast-core-resize-area"] {
        overflow: scroll !important;
      }
      #main-root [data-testid="beast-core-resize-area"] > div:last-child {
        width: 540px !important;
      }
    `,
  },
];
