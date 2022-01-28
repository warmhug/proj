import * as services from './services'

export const NAMESPACE = '@maintain' // eslint-disable-line

export default {
  namespace: NAMESPACE,
  state: {
    metaData: {},
    iconData: {},
    newIconData: {},
    catalogLevelList2: [], // 目录级别2
    catalogLevelList3: [], // 目录级别3
    typeList: [], // 全量类型
    checkList: [],
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
  effects: {
    // 列表查询
    * getMetadataList({ payload }, { call, put }) {
      const result = yield call(services.getMetadataList, payload)
      const { success, data } = result
      if (success) {
        yield put({ type: 'updateState', payload: { metaData: data } })
      }
    },
    // icon列表查询
    * getIconList({ payload, newIconData }, { call, put }) {
      const result = yield call(services.getIconList, payload);
      const { success, data } = result
      if (success) {
        yield put({
          type: 'updateState',
          payload: { [newIconData ? 'newIconData' : 'iconData']: data },
        })
      }
    },
    // 新建
    * addMetadataList({ payload, callback }, { call }) {
      const result = yield call(services.addMetadataList, payload)
      const { success } = result
      callback(success)
    },
    // 编辑
    * updateMetadataList({ payload, callback }, { call }) {
      const result = yield call(services.updateMetadataList, payload)
      const { success } = result
      callback(success)
    },
    // 新建图标
    * addIcon({ payload, callback }, { call }) {
      const result = yield call(services.addIcon, payload)
      const { success } = result
      callback(success)
    },
    // 编辑图标
    * updateIcon({ payload, callback }, { call }) {
      const result = yield call(services.updateIcon, payload)
      const { success } = result
      callback(success)
    },
    // 目录级别获取
    * getCatalogLevel({ payload }, { call, put }) {
      const result = yield call(services.getCatalogLevel, payload)
      const { success, data } = result
      if (success) {
        yield put({
          type: 'updateState',
          payload: {
            [`catalogLevelList${payload.level}`]: data.map(i => ({
              ...i,
              label: i.name,
              value: i.name,
            })),
          },
        })
      }
    },
    // 获取全量
    * getTypeList({ payload }, { call, put }) {
      const result = yield call(services.getTypeList, payload);
      const { success, data } = result
      if (success) {
        yield put({
          type: 'updateState',
          payload: { typeList: data.categoryVOList },
        })
      }
    },
    // 批量删除
    * deleteMetaList({ payload, callback }, { call }) {
      const result = yield call(services.deleteMetaList, payload)
      const { success } = result
      callback(success)
    },
    // 获取 审核列表
    * getCheckList({ payload, callback = () => {} }, { call, put }) {
      const result = yield call(services.getCheckList, payload)
      const { success, data } = result
      if (success) {
        yield put({
          type: 'updateState',
          payload: {
            checkList: data,
          },
        })
        callback(data)
      }
    },
  },
}
