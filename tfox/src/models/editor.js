/* eslint max-len: 0 */
import { aDownload } from '../utils'
import * as services from './services'

export const NAMESPACE = '@editor' // eslint-disable-line
const initState = {
  metaTree: [], // 搜到的产品树
  metaTns: {}, // 树单层节点列表
  searchList: [], // 模糊搜索列表
  instanceData: {}, // 实例数据
  openInstanceData: {}, // 实例数据
  temp: '', // 模版名称
  openTempData: {}, // 模板列表
  tempData: {}, // 我的模板列表
  graphInfo: {},
  // 项目
  projs: [],
  // 图
  srhTags: [],
}

export default {
  namespace: NAMESPACE,
  state: initState,
  reducers: {
    reset() {
      return {
        ...initState,
      }
    },
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
  effects: {
    * downloadWithToken({ payload }, { call }) {
      // 注意 file fileName 是自定义返回值，在 createService.js 里的 interceptors 里
      const { file, fileName } = yield call(services.downloadWithToken, payload)
      const fname = (fileName && decodeURIComponent(fileName))
        || `${payload.name || '未命名'}${payload._ext}`;
      aDownload(file, fname);
    },
    * getMetadata({ payload }, { call }) {
      const result = yield call(services.getMetadata, payload)
      return result
    },
    // 树搜索结果列表
    * getMetaTree({ payload }, { call, put }) {
      const result = yield call(services.getMetaTree, payload)
      const { success, data } = result
      if (success) {
        yield put({
          type: 'updateState',
          payload: { metaTree: data },
        });
      }
    },
    // 树单层节点列表
    * getMetaTns({ payload, callback = () => {} }, { call, put }) {
      const result = yield call(services.getMetaTns, payload)
      const { success, data } = result
      if (success) {
        yield put({
          type: 'updateState',
          payload: { metaTns: data },
        })
        callback(data || {});
      }
    },
    // 模糊搜索
    * searchList({ payload }, { call, put }) {
      const result = yield call(services.searchList, payload)
      const { success, data } = result
      if (success) {
        const searchList = []
        data.forEach(item => {
          const { tagVOList, shortDescription } = item
          const txt = (tagVOList && tagVOList.length) ?
            ` (${tagVOList.map(val => val.tagName).join(',')})` : '';
          searchList.push({
            label: `${shortDescription}${txt}`,
            ...item,
          });
        });
        yield put({
          type: 'updateState',
          payload: { searchList },
        });
      }
    },
    // 新建模板
    * insertTemplate({ payload, callback }, { call }) {
      const result = yield call(services.insertTemplate, payload)
      const { success } = result
      callback(success)
    },
    // 修改模版
    * modifyTemplate({ payload, callback }, { call }) {
      const result = yield call(services.modifyTemplate, payload)
      const { success } = result
      callback(success)
    },
    // 模板列表
    * getTemplateList({ payload, isOpen }, { call, put, all }) {
      // const { tempList, myTempList } = yield select(state => state[NAMESPACE])
      const params = { pageIndex: 1, pageSize: 12, ...payload }
      const result = yield call(services.getTemplateList, params, isOpen)
      const { success, data } = result
      if (success) {
        const list = data.records
        const res = yield all(list.map(function* fun(item) {
          try {
            const { fileKey } = item
            const txt = yield call(services.downloadTxt, { fileKey })
            return { ...item, fileString: txt }
          } catch (err) {
            return { ...item, fileString: null }
          }
        }));
        const newData = { ...data, records: res };
        yield put({
          type: 'updateState',
          payload: isOpen ? { openTempData: newData } : { tempData: newData },
        })
      }
    },
    // 查询架构图列表
    * getInstanceList({ payload, isOpen }, { call, put, all }) {
      const params = { pageIndex: 1, pageSize: 12, ...payload }
      const result = yield call(services.getInstanceList, params, isOpen)
      const { success, data } = result
      if (success) {
        const list = data.records
        const res = yield all(list.map(function* fun(item) {
          try {
            const { fileKey } = item
            const txt = yield call(services.downloadTxt, { fileKey })
            return { ...item, fileString: txt }
          } catch (err) {
            return { ...item, fileString: null }
          }
        }));
        const newData = { ...data, records: res };
        yield put({
          type: 'updateState',
          payload: isOpen ? { openInstanceData: newData } : { instanceData: newData },
        })
      }
    },
    // 新建架构图
    * insertInstance({ payload, callback }, { call }) {
      const result = yield call(services.insertInstance, payload)
      const { success, data } = result
      callback(success, data)
    },
    // 修改架构图
    * updateInstance({ payload, callback = () => {} }, { call }) {
      const result = yield call(services.updateInstance, payload)
      const { success } = result;
      callback(success);
      return success;
    },
    // 最终保存架构图
    * submitInstance({ payload, callback }, { call }) {
      const result = yield call(services.submitInstance, payload)
      callback(result)
    },
    // 查询模版名称
    * getTempByName({ payload, callback }, { call, put }) {
      const result = yield call(services.getTempByName, payload)
      const { success, data } = result
      if (success) {
        yield put({
          type: 'updateState',
          payload: {
            temp: data,
          },
        })
        callback && callback(data)
      }
    },
    // 根据 ID 查询 架构图 实例或模板 详情
    * getGraphDetail({ payload, callback, path = 'instance' }, { call }) {
      const result = yield call(services.getGraphDetail, { id: payload.id }, path)
      const { success, data } = result
      callback(success, data)
    },
    // 删除架构图
    * delGraph({ payload, callback, path = 'instance' }, { call }) {
      const result = yield call(services.delGraph, payload, path)
      const { success } = result
      callback(success)
    },
    // 模板/架构图是否公开
    * openGraph({ payload, callback }, { call }) {
      const { id, open, gType } = payload
      const result = yield call(services.openGraph, { id, open }, gType)
      const { success } = result
      callback(success)
    },
    // 关联架构图
    * instanceRelate({ payload, callback = () => {} }, { call }) {
      const result = yield call(services.instanceRelate, payload)
      const { success } = result
      callback(success)
      return success;
    },
    // 查看架构图关联的项目
    * getByInstanceId({ payload, callback }, { call }) {
      const result = yield call(services.getByInstanceId, payload)
      const { success, data } = result
      callback(success, data)
    },
    // 标签获取
    * getTagList({ payload }, { call, put }) {
      const result = yield call(services.getTagList, payload)
      const { success, data } = result
      if (success && data.records.length) {
        yield put({
          type: 'updateState',
          payload: { srhTags: data.records },
        })
      }
    },
    * relationTag({ payload, callback }, { call }) {
      const result = yield call(services.relationTag, payload)
      const { success, data } = result
      callback(success, data)
      return success;
    },
    * searchProjects({ payload }, { call, put, all }) {
      const result = yield call(services.searchProjects, {
        pageNum: 1,
        pageSize: 10,
        operateType: 'search',
        ...payload,
      })
      const { success, data } = result
      if (!success || !data.list) {
        return
      }
      const newList = data.list.filter(item => item.collection)
      const res = yield all(newList.map(function* fun(item) {
        let subList = []
        try {
          const subData = yield call(services.searchProjectsByColl, item.projectId, {
            page: 1, pageSize: 100,
          })
          if (subData.success && subData.data.list && subData.data.list.length) {
            subList = subData.data.list.map(sd => ({ ...sd, _indent: true }))
          }
          return subList
        } catch (err) {
          return subList
        }
      }))
      const projs = []
      data.list.forEach(item => {
        // 如果是 项目集、加入子项目
        projs.push(item)
        for (let index = 0; index < newList.length; index++) {
          const ele = newList[index];
          if (ele.projectId === item.projectId) {
            projs.push(...res[index])
          }
        }
      })
      yield put({
        type: 'updateState',
        payload: { projs },
      })
    },
    // 发布相关
    * releaseGather({ payload, callback }, { call, all }) {
      const result = yield all(
        Object.keys(payload || {}).map(function* fun(key) {
          const item = payload[key];
          try {
            const txt = yield call(services[key], item);
            return { ...item, flag: txt };
          } catch (err) {
            return { ...item, flag: null };
          }
        })
      );
      const res = (result || []).find((v) => !v.flag || !v.flag.success) || null;
      if (res) {
        callback(false);
      } else {
        callback(true);
      }
    },
  },
}
