/* eslint-disable import/prefer-default-export */
import request, { extend } from 'umi-request';
import { message } from 'antd';
import mockData from './_mockData';

extend({
  //  总是发送带有凭证的请求
  credentials: 'include',
  //  默认超时时间
  timeout: 15000,
});
request.use(async (ctx, next) => {
  await next();
  const { req: { options } } = ctx
  if (options.responseType === 'blob') {
    const { data, response } = ctx.res
    // 处理下载接口，downloadWithToken
    if (!response?.headers) return;
    const ct = response?.headers.get('content-disposition')
    ctx.res = {
      file: data,
      fileName: ct ? ct.replace('attachment;filename=', '').replace(/"/g, '') : '',
    };
  }
});
request.interceptors.response.use(async (response) => {
  try {
    const data = await response.clone().json() || {}
    const disabledShowMessageUrl = '/getByInstanceId'
    if (data.success === false && !response.url?.includes(disabledShowMessageUrl)) {
      message.error(data.message || '未定义错误')
    }
  } catch (error) {
    // console.log(error)
  }
  return response
});

const prefix = '';

// console.log('process.env.UMI_ENV', process?.env?.NODE_ENV);
const abstractReq = (method) => {
  // for dev
  if (process?.env?.NODE_ENV === 'development') {
    // return request[method];
  }
  // for prod
  const formatRes = (path) => {
    const res = mockData[path];
    if (typeof res === 'function') {
      return res(null, { end: () => {} });
    } else {
      return res;
    }
  }
  return (path) => {
    if (method === 'get') {
      return formatRes(path);
    } else if (method === 'post') {
      return formatRes(`POST ${path}`);
    } else if (method === 'put') {
      return formatRes(`PUT ${path}`);
    }
  }
}

export async function getLoginUrl(callback) {
  return abstractReq('get')('/4A/getLoginUrl', {
    back_url: callback ? encodeURIComponent(callback) : '',
  });
}

export const getUserInfo = () => {
  return abstractReq('get')('/account/user/info');
}

// 搜索项目
export async function searchProjects(params) {
  return abstractReq('get')('/platform/api/business/summary', {
    params,
  });
}

// 根据项目集 id 搜索项目
export async function searchProjectsByColl(collectionId, params) {
  return abstractReq('get')(`/platform/api/business/projectCollections/${collectionId}/relatedProjects`, {
    params,
  });
}

// 关联项目提交
export async function instanceRelate(data) {
  return abstractReq('post')('/project/api/project/instance/related', {
    data,
  });
}

// 查询架构图关联项目
export async function getByInstanceId(params) {
  return abstractReq('get')('/project/api/project/instance/getByInstanceId', {
    params,
  });
}

/**
 * 以下都是 design 接口，来自 dtmp 服务
*/

export async function downloadWithToken(params) {
  return abstractReq('get')(`${prefix}/design/ppt/export`, {
    params,
    responseType: 'blob',
    getResponse: true, // 获取response.headers需要使用
  });
}

// 通过fileKey下载文件
export async function downloadTxt(params) {
  return abstractReq('get')(`${prefix}/oss/inline/txt`, {
    params,
  })
}

// 获取元数据typeKey类型
export async function getTypeList(params) {
  return abstractReq('get')(`${prefix}/design/metadata/node/get`, {
    params,
  })
}
// 元数据批量删除
export async function deleteMetaList(params) {
  return abstractReq('post')(`${prefix}/design/metadata/list/delete`, {
    data: params,
  })
}

// 获取单个元数据
export async function getMetadata(params) {
  return abstractReq('get')(`${prefix}/design/metadata/get`, {
    params,
  })
}

export async function getMetaTree(params) {
  return abstractReq('get')(`${prefix}/design/metadata/tree/get`, {
    params,
  })
}

export async function getMetaTns(params) {
  return abstractReq('get')(`${prefix}/design/metadata/node/get`, {
    params,
  })
}

// 模糊搜索
export async function searchList(params) {
  return abstractReq('get')(`${prefix}/design/metadata/tag/search`, {
    params,
  })
}

// 元数据列表
export async function getMetadataList(params) {
  return abstractReq('get')(`${prefix}/design/metadata/page/list/get`, {
    params,
  })
}

// 新建列表
export async function addMetadataList(params) {
  return abstractReq('post')(`${prefix}/design/metadata/add`, {
    data: params,
  })
}

// 编辑列表
export async function updateMetadataList(params) {
  return abstractReq('put')(`${prefix}/design/metadata/update`, {
    data: params,
  })
}

// 目录级别获取
export async function getCatalogLevel(params) {
  return abstractReq('get')(`${prefix}/design/tag/category/level/get`, {
    params,
  })
}

// 首次插入，无 id
export async function insertInstance(params) {
  return abstractReq('post')(`${prefix}/design/instance/insert`, {
    data: params,
  })
}

// 快速保存，需要传入 id
export async function updateInstance(params) {
  return abstractReq('put')(`${prefix}/design/instance/update`, {
    data: params,
  })
}

// 最后保存，需要传入 xmlText
export async function submitInstance(params) {
  return abstractReq('put')(`${prefix}/design/instance/after/update`, {
    data: params,
  })
}

// 查询架构图列表
export async function getInstanceList(params, isOpen) {
  return abstractReq('get')(`${prefix}/design/instance/${isOpen ? 'open/' : ''}page/list/get`, {
    params,
  })
}

// 根据 ID 查询 架构图 实例或模板 详情，path 值为 instance 或 template
export async function getGraphDetail(params, path) {
  return abstractReq('get')(`${prefix}/design/${path}/id/get/detail`, {
    params,
  })
}

// 模板列表
export async function getTemplateList(params, isOpen) {
  return abstractReq('get')(`${prefix}/design/template/${isOpen ? 'open/' : ''}page/list/get`, {
    params,
  })
}

// 架构图 模板 是否公开，path 值为 instance 或 template
export async function openGraph(params, path) {
  return abstractReq('post')(`${prefix}/design/${path}/open/update`, {
    data: params,
  })
}

// 架构图 模板 删除，path 值为 instance 或 template
export async function delGraph(params, path) {
  return request.delete(`${prefix}/design/${path}/delete`, {
    params,
  })
}

// 新建模板
export async function insertTemplate(params) {
  return abstractReq('post')(`${prefix}/design/template/insert`, {
    data: params,
  })
}

// 修改模板
export async function modifyTemplate(params) {
  return abstractReq('put')(`${prefix}/design/template/update`, {
    data: params,
  })
}

// 根据名称查询架构图模板Id
export async function getTempByName(params) {
  return abstractReq('get')(`${prefix}/design/template/name/get`, {
    params,
  })
}

// 获取 审核列表
export async function getCheckList(params) {
  return abstractReq('get')(`${prefix}/design/template/check/list`, {
    params,
  })
}

// 关联 tag
export async function relationTag(params) {
  return abstractReq('post')(`${prefix}/design/tag/relation/update`, {
    data: params,
  })
}

// 标签获取 参数 type 值为 icon | relation
export async function getTagList(params) {
  return abstractReq('get')(`${prefix}/design/tag/page/list/get`, {
    params,
  })
}

// 图标列表
export async function getIconList(params) {
  return abstractReq('get')(`${prefix}/design/icon/page/list/get`, {
    params,
  })
}

// 新建图标
export async function addIcon(params) {
  return abstractReq('post')(`${prefix}/design/icon/add`, {
    data: params,
  })
}

// 修改图标
export async function updateIcon(params) {
  return abstractReq('post')(`${prefix}/design/icon/update`, {
    data: params,
  })
}

// 上传文件
export function uploadFile(params) {
  return abstractReq('post')(`${prefix}/oss/design/uploadFile`, params)
}
