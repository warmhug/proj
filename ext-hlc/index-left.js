// alert(0);
console.log('iframe script');
const el = document.querySelector('#tuiEditor');
var xhr = new XMLHttpRequest();
xhr.onload = function() {
  if (xhr.status >= 200 && xhr.status < 400) {
    const resp = xhr.responseText;
    // console.log('log resp: ', resp);
    const tuiInst = new toastui.Editor.factory({
      el, initialValue: resp, viewer: true,
    });
  }
};
xhr.open('GET', './eng.md', true);
xhr.send();
