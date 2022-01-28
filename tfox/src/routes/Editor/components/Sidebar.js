/* eslint max-len: 0, object-property-newline: 0, new-cap: 0 */
import React, { useState, useRef, useContext, useCallback } from 'react';
import { Collapse, Tooltip } from 'antd';
import { QuestionCircleOutlined, PlusOutlined } from '@ant-design/icons';
import SidebarScratchpad from './SidebarScratchpad';
import SidebarShapes from './SidebarShapes';
import SidebarTree from './SidebarTree';
import { EditorContext } from '../common';
import { comps } from '../utils';
import './Sidebar.less';

const DEF_SHAPE = 'rectangle';

export default ({ typeKey, onAddVertex }) => {
  const editor = useContext(EditorContext);
  const [selShape, setSelShape] = useState(DEF_SHAPE)
  const childRef = useRef();

  const addVertex = (data) => {
    onAddVertex(typeKey === 'freedom' ? selShape : comps[0].value, data);
  }

  const selectShape = useCallback(sp => setSelShape(sp || DEF_SHAPE), []);

  const pro = (
    <>
      <Collapse defaultActiveKey={['SidebarScratchpad']} ghost>
        <Collapse.Panel
          key="SidebarScratchpad"
          header={
            <>
              便签本
              <Tooltip
                placement="rightTop"
                title={
                  <div className="sidebar-tooltip">
                    <div>使用说明：</div>
                    <div>点击这里形状、自动添加到画布里</div>
                    <div>可多选形状、点击右边 + 保存进便签本</div>
                    <div>便签本数据目前在 本地存储 里、刷新不会丢失</div>
                  </div>
                }
                color="#ffffff"
              >
                <QuestionCircleOutlined className="sidebar-tooltip-icon" />
              </Tooltip>
            </>
          }
          extra={<PlusOutlined onClick={(e) => e.stopPropagation() || childRef.current.handleAdd()} />}
        >
          <SidebarScratchpad ref={childRef} editor={editor} />
        </Collapse.Panel>
      </Collapse>
      <Collapse defaultActiveKey={['shapes']} ghost>
        <Collapse.Panel
          key="shapes"
          header={
            <>
              拖动形状到画布
              <Tooltip
                placement="rightTop"
                title={
                  <div className="sidebar-tooltip">
                    <div>使用说明：</div>
                    <div>单击：选择拖拽添加形状</div>
                    <div>双击：选中形状</div>
                    <div>拖拽：添加形状</div>
                    <div>esc: 取消选中</div>
                  </div>
                }
                color="#ffffff"
              >
                <QuestionCircleOutlined className="sidebar-tooltip-icon" />
              </Tooltip>
            </>
          }
        >
          <SidebarShapes editor={editor} selectShape={selectShape} />
        </Collapse.Panel>
      </Collapse>
    </>
  )

  const base = (
    <>
      <Collapse defaultActiveKey={['modules']} ghost>
        <Collapse.Panel key="modules" header="点击插入新模块">
          <div className="sidebar-comps">
            {comps.map((item, idx) => (
              <div key={item.value}>
                <div className="sidebar-comps-tit">样式{idx + 1}</div>
                <div
                  key={item.value}
                  className="sidebar-comps-item"
                  onClick={() => onAddVertex(item.value, undefined)}
                >
                  <img src={`https://img.alicdn.com/tfs/${item.img}.png`} title="点击加入画板" />
                </div>
              </div>
            ))}
          </div>
        </Collapse.Panel>
      </Collapse>
    </>
  );

  return (
    <div className="sidebar">
      {typeKey === 'freedom' ? pro : base}
      <SidebarTree onSelect={addVertex} />
    </div>
  );
};
