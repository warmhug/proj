/*

svg 深入 https://flaviocopes.com/svg/
- 包括通过 img 或 CSS background-images 引用的 单独 svg 文件，必须要写 XML declaration DOCTYPE 声明。
- 直接写在 html 里的 svg 代码，不能写 XML declaration 和 DOCTYPE 声明。
- 如果 svg 使用 img 标签加载，不能与 css/js 交互，其包含的外部链接如 images, stylesheets, scripts, fonts 不能被加载。

svg 文件 需要以 `<?xml version="1.0" encoding="UTF-8"?>` 和 `<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">` 开头

svg icon `<use class="icon-use" xlink:href="./sprites.svg#icon-hamburger"></use>`

svg 元素

`<object data="https://cdn.glitch.com/3b178055-c252-40d3-b2b8-69919fd392c5%2Fflag.svg?1522475211134" type="image/svg+xml"></object>`

`<iframe src="https://cdn.glitch.com/3b178055-c252-40d3-b2b8-69919fd392c5%2Fflag.svg?1522475211134" frameborder="0" width="300" height="200"></iframe>`

`<embed src="https://cdn.glitch.com/3b178055-c252-40d3-b2b8-69919fd392c5%2Fflag.svg?1522475211134" type="" />`

`<div style="background-image: url(https://cdn.glitch.com/3b178055-c252-40d3-b2b8-69919fd392c5%2Fflag.svg?1522475211134); height: 200px; width: 300px;"></div>`
`<img src="svgstr" alt="">`
`<img src="https://cdn.glitch.com/3b178055-c252-40d3-b2b8-69919fd392c5%2Fflag.svg?1522475211134" />`

`<svg width="50" height="50" xmlns="http://www.w3.org/2000/svg"><circle cx="25" cy="25" r="20"/></svg>`

*/

function pieChart(percentage, size) {
  // primary wedge
  var unit = (Math.PI * 2) / 100;
  var startangle = 0;
  var ra = 4;
  var endangle = percentage * unit - 0.001;
  var x1 = (size / ra) + (size / ra) * Math.sin(startangle);
  var y1 = (size / ra) - (size / ra) * Math.cos(startangle);
  var x2 = (size / ra) + (size / ra) * Math.sin(endangle);
  var y2 = (size / ra) - (size / ra) * Math.cos(endangle);
  var big = 0;
  if (endangle - startangle > Math.PI) {
      big = 1;
  }
  var d = "M " + (size / ra) + "," + (size / ra) +  // Start at circle center
      " L " + x1 + "," + y1 +     // Draw line to (x1,y1)
      " A " + (size / ra) + "," + (size / ra) +       // Draw an arc of radius r
      " 0 " + big + " 1 " +       // Arc details...
      x2 + "," + y2 +             // Arc goes to to (x2,y2)
      " Z";                       // Close path back to (cx,cy)

  return `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size / 2} ${size / 2}">
      <circle cx="${size / ra}" cy="${size / ra}" r="${size / ra}" fill="#ebebeb"></circle>
      <path d="${d}" fill="red"></path>
      <circle cx="${size / ra}" cy="${size / ra}" r="${size * 0.17}" fill="#fff"></circle>
    </svg>
  `;
}
const pieHtml = pieChart(50, 72);
const div = document.createElement('div');
div.innerHTML = pieHtml;
document.body.appendChild(div);


function randomColor() {
  return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
}

// 参考 https://unpkg.com/placeholder.js@3.1.0/dist/placeholder.js
function createImg(opts = {
  size: [128,128], text: '128', bgColor: randomColor(), color: randomColor(),
  // normal / italic / oblique
  fstyle: 'normal',
  // normal / bold / bolder / lighter
  fweight: 'bold',
  fsize: '', // auto calculate the font size to response to the image size
  ffamily: 'consolas',
}) {
  let cvs, cvsContext;
  const createCanvas = () => {
    if (!cvs || !cvsContext) {
      cvs = document.createElement('canvas');
      cvsContext = cvs.getContext('2d');
    }
    cvs.width = opts.size[0];
    cvs.height = opts.size[1];
    cvsContext.clearRect(0, 0, opts.size[0], opts.size[1]);
    cvsContext.fillStyle = opts.bgColor;
    cvsContext.fillRect(0, 0, opts.size[0], opts.size[1]);
    cvsContext.fillStyle = opts.color;
    cvsContext.font = `${opts.fstyle} normal ${opts.fweight} ${opts.fsize || 100}px ${opts.ffamily}`;
    const text_width = cvsContext.measureText(opts.text).width,
    let scale = 1.0;
    if (!opts.fsize) {
      scale = Math.min(0.7 * opts.size[0] / text_width, 0.7 * opts.size[1] / 100);
    }
    cvsContext.translate(opts.size[0] / 2, opts.size[1] / 2);
    cvsContext.scale(scale, scale);
    cvsContext.textAlign = 'center';
    cvsContext.textBaseline = 'middle';
    cvsContext.fillText(opts.text, 0, 0);
    return cvs;
  }
  return createCanvas().toDataURL();
}
// <form>
//   size: <input id="size" value="375x200" />
//   text: <input id="text" value="text" />
//   bgColor: <input id="bgColor" value="#ccc" placeholder="#f3efee #0D8FDB #39DBAC #F8591A" />
//   <br />
//   <img id="imgEle" src="" />
// </form>
const opts = {
  size: [375, 200],
  bgColor: '#ccc',
  color: 'white',
  text: 'text',
};
['size', 'text', 'bgColor'].forEach(function(i) {
  document.getElementById(i).addEventListener('input', function() {
    opts[i] = this.value;
    document.getElementById('imgEle').setAttribute('src', createImg(opts));
  });
});

// canvas 有损缩放图片
async function resizeImg(imgSrc) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const imgObj = await loadImage(imgSrc);
  const nw = imgObj.naturalWidth, nh = imgObj.naturalHeight;
  const ratio = nw / canvas.width;
  canvas.height = nh / ratio;
  ctx.drawImage(imgObj, 0, 0, nw / ratio, nh / ratio);
  return canvas;
}
const cvs = await resizeImg('https://gw.alipayobjects.com/zos/rmsportal/PnjNniBkexOKzoehotzl.jpg')
console.log('log cvs: ', cvs, cvs.width);

async function loadImage(imgSrc) {
  const imgObj = await new Promise((resolve) => {
    const img = new Image;
    img.onload = () => {
      resolve(img);
    };
    img.src = imgSrc;
  });
  console.log('img', imgObj);
}

const loadImage1 = async (imgSrc) => {
  const imgObj = await new Promise((resolve) => {
    const image = document.createElement('img');
    image.onload = () => {
      resolve(image);
    };
    image.src = imgSrc;
  });
  console.log('img', imgObj);
}

function getImgBase64() {
  // <input type="file" id="file" name="file" />
  const file = document.getElementById('file').files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function (event) {
    const base64 = event.target.result;
    console.log('log base64: ', base64);
  };
}

// base64 图片自动下载
// https://stackoverflow.com/questions/14011021/how-to-download-a-base64-encoded-image
function downloadBase64File(base64String, fileName) {
  // const linkSource = `data:${contentType};base64,${base64Data}`;
  const now = new Date();
  const formatNow = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}_${now.getHours()}-${now.getMinutes()}`;
  const downloadLink = document.createElement("a");
  downloadLink.href = base64String;
  downloadLink.download = fileName || formatNow + '.jpeg';
  downloadLink.click();
}

// 读取 json 文件内容
const readJsonFile = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (event) => {
      resolve(JSON.parse(event.target.result));
    };
  });
};

// 下载字符串为 json 文件
import fileSaver from 'file-saver';
const downloadJson = (jsonData, { filename }) => {
  if (!jsonData) {
    return;
  }
  try {
    fileSaver.saveAs(
      new Blob([JSON.stringify(jsonData, null, 4)], { type: 'application/json;charset=utf-8' }),
      `${filename}.json`
    );
  } catch (e) {
    console.log(e);
  }
};
