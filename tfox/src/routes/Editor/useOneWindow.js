import { useEffect, useRef } from 'react';
import { on, off, broadcast } from 'sysend';

const WINDOW_INIT = 'window_init';
const MODEL_CHANGED = 'model_changed';
const CLOSE = 'window_close';
const INIT_ALERT_TEXT = '同时打开两个窗口可能会导致数据相互覆盖，请关闭其他窗口';
const CHANGE_ALERT_TEXT = '您打开了多个相同窗口，请关闭其他窗口、以免数据相互覆盖';

export const Events = {
  init: WINDOW_INIT,
  changed: MODEL_CHANGED,
  close: CLOSE,
}

export default function useOneWindow({ key, initAlertText = INIT_ALERT_TEXT,
  alertFunction = window.alert, changeAlertText = CHANGE_ALERT_TEXT }) {
  const myWindowId = useRef(null);
  const send = (eventName, model) => {
    broadcast(eventName, { ...model, windowId: myWindowId.current });
  }
  useEffect(() => {
    myWindowId.current = +new Date();
    const handleWindowInit = ({ id, windowId }) => {
      if (id === key) {
        send(CLOSE, { id, targetWindowId: windowId, type: WINDOW_INIT });
      }
    }
    const handleModelChanged = ({ id, windowId }) => {
      if (id === key) {
        send(CLOSE, { id, targetWindowId: windowId, type: MODEL_CHANGED })
      }
    }
    const handleClose = ({ id, targetWindowId, type }) => {
      if (id === key && targetWindowId === myWindowId.current) {
        if (type === WINDOW_INIT) {
          alertFunction(initAlertText);
        } else if (type === MODEL_CHANGED) {
          alertFunction(changeAlertText);
        }
      }
    }
    // 启动时有一次触发changed，不合理的设计，这里先不做init事件触发，统一走changed
    // send(WINDOW_INIT, {
    //   id: key,
    //   windowId: myWindowId.current,
    // });
    on(WINDOW_INIT, handleWindowInit);
    on(MODEL_CHANGED, handleModelChanged);
    on(CLOSE, handleClose);
    return () => {
      off(WINDOW_INIT, handleWindowInit);
      off(MODEL_CHANGED, handleModelChanged);
      off(CLOSE, handleClose);
    }
  }, []);

  return {
    send,
  }
}
