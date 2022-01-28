/* eslint no-confusing-arrow: 0 */
// http://youmightnotneedjquery.com/
// 兼容 IE10 以上

// export const eleById = ele => document.getElementById(ele)

// export const toggleCls = (el, cls) => el.classList.toggle(cls);

// export const hasCls = (el, cls) => el.classList.contains(cls);

// export const addCls = (el, cls) => el.classList.add(cls);

// export const delCls = (el, cls) => el.classList.remove(cls);

export const initOper = { scaleNum: 100 }
export const initCellAttr = { cell: {}, cellStyle: {}, bounds: {} }
export const initAttr = { visible: false, styles: {} }
export const initCols = { cols: 8, colsVisible: false, cellStates: {} }

export const defaultIcon =
  'https://img.alicdn.com/tfs/TB10BdiHND1gK0jSZFyXXciOVXa-16-16.gif';

export const noteIcon =
  'https://img.alicdn.com/tfs/TB1bfUcjDM11u4jSZPxXXahcXXa-500-620.jpg';

export const colorList = [
  {
    label: '阿里云官方主题色',
    colors: [
      '#ffffff', '#ffd454', '#ffb600', '#ffab00', '#ff6a00', '#ff1d00', '#d7d8d9',
      '#c3c5c6', '#373d41', '#73777a', '#525252', '#000000',
    ],
  },
  {
    label: '蓝色主题',
    colors: ['#b2d8fd', '#5db3ff', '#0088ff', '#537eff', '#3052ff', '#0029fa', '#0066cc', '#003d6f'],
  },
  {
    label: '绿色/紫色主题',
    colors: ['#9ef4b2', '#79d889', '#06b624', '#086b18', '#dcb1ff', '#8b00ff', '#6800bf', '#45007d'],
  },
]

export const comps = [
  {
    value: 'first',
    img: 'TB1jvSRPEH1gK0jSZSyXXXtlpXa-400-52',
    // des: '单元格',
  },
  // {
  //   value: 'second',
  //   img: 'TB1dqrJLpY7gK0jSZKzXXaikpXa-190-74',
  //   des: '图文',
  // },
  {
    value: 'third',
    img: 'TB1.dmSPEY1gK0jSZFCXXcwqXXa-402-76',
    // des: '复合组件',
  },
]

export const rowColOpt = [
  {
    key: 'col',
    name: '+列',
    urls: [
      { value: 'first', img: 'TB1K_9GPAL0gK0jSZFtXXXQCXXa-52-8' },
      { value: 'third', img: 'TB1F3mSPEY1gK0jSZFMXXaWcVXa-60-16' },
    ],
  },
  {
    key: 'row',
    name: '+行',
    urls: [
      { value: 'first', img: 'TB1IMCHdzMZ7e4jSZFOXXX7epXa-50-10' },
      { value: 'third', img: 'TB1RV5YPAY2gK0jSZFgXXc5OFXa-56-16' },
    ],
  },
]

export const htmlEntities =
  (html) => html ? html.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&apos;') : '';

export const createNode = (name, attrs = {}) => {
  const node = document.createElement(name);
  Object.keys(attrs).forEach(attr => {
    let val = attrs[attr]
    if (attr === 'style') {
      // 后端不能解析 transparent 做转换 TODO 只应该控制 color 值，并注意此函数被调用地方
      val = val.replace(/transparent/g, '0xffffff');
    }
    node.setAttribute(attr, val);
  })
  return node
}

/* eslint max-len: 0 */
export const svgToImg = (svgNode, wh, callback, format = 'image/png') => {
  // svg 标签要 加上 xmlns http://www.w3.org/2000/svg 属性 不然 image 会一直进 error 方法
  // 如果 svg 中 包含了 image 则也需要加上 属性 xmlns http://www.we.org/1999/xlink
  // svg 内容中不能有中文字符
  // img.src = `data:image/svg+xml,${svg}';
  // img.src = `data:image/svg+xml;base64,${window.btoa(svg)}`;
  // svg 内容中可以有中文字符
  // img.src = `data:image/svg+xml,${unescape(encodeURIComponent(svg))}`;
  // img.src = `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(svg)))}`;
  // svgNode.setAttribute('externalResourcesRequired', true)
  // const svgRaw = '<svg width="50" height="50" xmlns="http://www.w3.org/2000/svg"><circle cx="25" cy="25" r="20"/></svg>'
  const image = new Image();
  image.src = `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(svgNode.outerHTML)))}`
  image.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = wh.width || 500;
    canvas.height = wh.height || 300;
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);
    const imgUrl = canvas.toDataURL(format)
    callback(imgUrl)
  };
  // 当 svg 里含有 image 等外部资源时 会触发 onerror
  // 解决办法 https://www.cnblogs.com/lhp2012/p/5149251.html
  image.onerror = () => {
    callback(false)
  };
}
/*
svgToImg(svgNode, wh, (imgUrl) => {
  if (!imgUrl) {
    Message.error('下载失败')
    return
  }
  const a = document.createElement('a');
  a.download = 'download.png';
  a.href = imgUrl;
  a.click();
})
*/

export const isParseError = parsedDocument => {
  // parser and parsererrorNS could be cached on startup for efficiency
  const parser = new DOMParser()
  const errorneousParse = parser.parseFromString('<', 'text/xml')
  const parsererrorNS = errorneousParse.getElementsByTagName('parsererror')[0].namespaceURI

  if (parsererrorNS === 'http://www.w3.org/1999/xhtml') {
    // In PhantomJS the parseerror element doesn't seem to have a special namespace, so we are just guessing here :(
    return parsedDocument.getElementsByTagName('parsererror').length > 0;
  }

  return parsedDocument.getElementsByTagNameNS(parsererrorNS, 'parsererror').length > 0;
}
