
import React from 'react'
import { Button } from 'antd';
import { useHistory } from 'umi';

export default () => {
  const history = useHistory();

  return (
    <div className="not-found">
      <div className="text">It is 404 page.</div>
      <Button
        onClick={() => history.replace('/')}
      >
        返回首页
      </Button>
    </div>
  )
}
