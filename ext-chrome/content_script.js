
// 在 manifest 的 content_scripts 里设置 "world": "MAIN", 不起作用。
// content_scripts 是独立环境执行，在注入的 content_script.js 里修改页面本来的 window 对象无效
// https://developer.chrome.com/docs/extensions/mv3/content_scripts/#isolated_world
// https://stackoverflow.com/questions/9515704
// https://stackoverflow.com/questions/12395722
// https://developer.mozilla.org/en-US/docs/Web/API/Window
// window 对象的 parent top 属性都是 只读 的。如 window.top = window; 修改无效
// Object.defineProperty(window, 'top', {
//   get () {
//     return 100;
//   }
// });

// 不能注入 content_scripts 的地方:
// 插件内的 html 文件，
// 动态页面 data:text/html,<html>Hello, World!</html>

// console.log('injected (ISOLATED window)', window, chrome);
// 包括 iframe 页面

window.addEventListener('load', () => {
  setTimeout(async () => {
    const { hl_videoSpeed = 2 } = await hl_utils.getStorage();
    // 很多网站内的视频、是以 iframe 形式嵌入 Twitter 或 视频网站 的视频
    await hl_utils.videoSpeedController(hl_videoSpeed, async (speed) => {
      await hl_utils.setStorage({ hl_videoSpeed: speed });
    });
    hl_utils.addTripleClickEvent(document, async (evt) => {
      console.log('log Triple click evt: ', evt);
      // await chrome.runtime.sendMessage({ action: 'openPopup' });
    }, 400);
  }, 1000);
});
