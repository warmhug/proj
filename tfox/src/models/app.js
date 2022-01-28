
/* eslint no-bitwise: 0 */
import Cookie from 'js-cookie';
import * as services from './services'

export const NAMESPACE = '@app' // eslint-disable-line

const setLog = userData => {
  const uuid16 = () => {
    return new Array(16)
      .fill('x')
      .join('')
      .replace(/[x]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
  }
  const { __bl } = window;
  if (__bl && __bl.sdkFlag) {
    __bl.setConfig({ uid: String(userData.accountId) });
  } else if (__bl && __bl.config) {
    __bl.config.uid = String(userData.accountId);
  }
  Cookie.set('delivery-platform_ID_TOKEN', btoa(`${uuid16()}${String(userData.accountId)}${uuid16()}`), { expires: 7, sameSite: 'strict' });
}

export default {
  namespace: NAMESPACE,
  state: {
    dayuInfo: {},
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
    * getUserInfo({ payload }, { call, put }) {
      const { getUserInfo, getLoginUrl } = services
      const { success, data } = yield call(getUserInfo, payload)
      if (success) {
        yield put({
          type: 'updateState',
          payload: {
            dayuInfo: data,
          },
        });
        setLog(data);
      } else {
        const res = yield call(getLoginUrl, window.location.href)
        if (res.success && res.data.loginUrl) {
          /* eslint require-atomic-updates: 0 */
          window.location.href = res.data.loginUrl
        }
      }
    },
  },
}
