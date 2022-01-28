import React, { useState, useEffect } from 'react'
import { useDispatch } from 'umi';
import { Input, message } from 'antd';
import { NAMESPACE } from '../../../models/editor';

export default (props) => {
  const dispatch = useDispatch();
  const { graphInfo: { id, name }, onChange } = props;
  const [showInput, setShowInput] = useState(false);
  const [newName, setNewName] = useState(name);

  useEffect(() => {
    setNewName(name)
  }, [name])

  const saveTitle = () => {
    dispatch({
      type: `${NAMESPACE}/updateInstance`,
      payload: { id, name: newName },
      callback: (success) => {
        if (success) {
          setShowInput(false);
          onChange(newName);
          message.success('修改名称成功');
        } else {
          message.error('修改名称失败');
        }
      },
    });
  };

  return (
    <>
      {showInput ? (
        <Input
          className="name-input"
          autoFocus
          size="small"
          placeholder="标题"
          onFocus={(e) => e.target.select()}
          onBlur={() => saveTitle()}
          onPressEnter={() => saveTitle()}
          value={newName}
          onChange={(e) => setNewName(e.target.value || '未命名')}
        />
      ) : (
        <span onClick={() => setShowInput(true)} className="tit">
          {newName}
        </span>
      )}
    </>
  )
}

// OperationTitle.propTypes = {
//   graphInfo: PropTypes.objectOf(PropTypes.any),
//   onChange: PropTypes.func,
// }
