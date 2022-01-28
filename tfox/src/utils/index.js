export const hideNav = ['tfox', 'editor', 'editor1']
  .some(item => location.pathname.includes(`/${item}`));

// TODO 彻底优化列表页，
// TODO preview 页面 URL 参数改为 id = xx ? type = template | instance 和 editor 页面一致
// 图形归类枚举值
export const G_TYPE = {
  // 模板
  TEMP: 'template',
  // 实例
  INST: 'instant',
};

// URL param 枚举
export const URL_PARAM = {
  cloneFromId: 'cloneFromId',
  id: 'id',
  type: 'type',
};

/* eslint no-confusing-arrow: 0 */
export const formatTags = (tas) => tas ? tas.map(ta => ({ label: ta.tagName, value: ta.tagId })) : [];

export const formatNum = (number) => {
  // console.log(typeof number.toFixed(2));
  return Number((number * 100).toFixed(2))
}

export const aDownload = (file, name) => {
  const url = window.URL.createObjectURL(new Blob([file]));
  const link = document.createElement('a');
  link.href = url;
  name && link.setAttribute('download', name);
  document.body.appendChild(link);
  link.click();
}

// export const isDtmp =
//   !isInIcestark() && window.location.pathname.indexOf('/iframe') === -1

export default {}
