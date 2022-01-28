/* eslint max-len: 0 */
import React, { useContext } from 'react'
import { Menu, Tooltip } from 'antd';
import { ShepherdTour, ShepherdTourContext } from 'react-shepherd';
import './OperationHelp.less';

let tour;
const tourOptions = {
  defaultStepOptions: { cancelIcon: { enabled: true } },
  useModalOverlay: true,
};

const UserGuidance = () => {
  tour = useContext(ShepherdTourContext);
  return <div onClick={tour.start}>操作引导</div>;
};

const beforeShowPromise = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      window.scrollTo(0, 0);
      resolve();
    }, 500);
  });
};

const steps = (isPro) => [
  {
    id: 'compsCenter',
    title: '选择模块样式',
    text: [isPro ? '单击或双击选择形状' : '点击模块样式，选择内容会出现在中间画布里'],
    attachTo: { element: isPro ? '.sidebar-shapes' : '.sidebar-comps', on: 'right-start' },
    beforeShowPromise,
    buttons: [
      {
        classes: 'shepherd-button-primary',
        text: '下一步',
        type: 'next',
        action: () => tour.show('treeCenter'),
      },
    ],
  },
  {
    id: 'treeCenter',
    title: '快速选择产品',
    text: ['点击产品、自动设置在画布里的节点上'],
    attachTo: { element: '.sidebar-tree', on: 'right-start' },
    beforeShowPromise,
    buttons: [
      {
        classes: 'shepherd-button-normal',
        text: '上一步',
        type: 'back',
        action: () => tour.show('compsCenter'),
      },
      {
        classes: 'shepherd-button-primary',
        text: '下一步',
        type: 'next',
        action: () => tour.show('editCenter'),
      },
    ],
  },
  {
    id: 'editCenter',
    title: '编辑区',
    text: ['选中画布中节点，可在编辑区修改节点样式'],
    attachTo: { element: '.attr-container', on: 'left-start' },
    beforeShowPromise,
    buttons: [
      {
        classes: 'shepherd-button-normal',
        text: '上一步',
        type: 'back',
        action: () => tour.show('treeCenter'),
      },
      {
        classes: 'shepherd-button-primary',
        text: '下一步',
        type: 'next',
        action: () => tour.show('operateCenter'),
      },
    ],
  },
  {
    id: 'operateCenter',
    title: '画布操作',
    text: [
      isPro ? '可以自由拖拽画图' :
        `<p>
        支持功能点：双击设置节点文字/图标，加行/加列，行/模块的上下顺序调整，同一个模块下节点之间可以拖拽换顺序 <br />
        查看以下 <b style="color: red;">动画演示</b>
      </p>
      <p><img width="870" src="https://img.alicdn.com/tfs/TB1IYqxWuL2gK0jSZPhXXahvXXa-985-283.gif" /></p>`,
    ],
    attachTo: { element: '.graph-tour', on: 'bottom-start' },
    beforeShowPromise,
    buttons: [
      {
        classes: 'shepherd-button-primary',
        text: '完成',
        type: 'next',
        action: () => tour.complete(),
      },
    ],
  },
];

export default (typeKey) => {
  return (
    <Menu>
      <Menu.Item>
        <ShepherdTour steps={steps(typeKey === 'freedom')} tourOptions={tourOptions}>
          <UserGuidance />
        </ShepherdTour>
      </Menu.Item>
      <Menu.Item>
        <Tooltip
          placement="rightTop"
          title={
            <div className="menu-help-tip">
              操作说明（
              <a href="https://yuque.antfin-inc.com/hualei.hl/work/bxcgz9" target="_blank" rel="noreferrer">
                详细文字+视频
              </a>
              ）：
              <br />
              以下是“基础版“(不能自由拖拽)操作步骤，灵活拖拽版额外支持灵活拖拽布局。<br />
              1. 点击即可插入新模块 <br />
              2. 选择数据，能替换节点默认值、或新增节点 <br />
              3. 设置节点属性 <br />
              4. 点发布，可加标签、关联项目、设为公开，也可导出 PPT 或图片 <br />
              5. 所有操作均会触发自动保存、也可手工点击保存按钮 <br />
            </div>
          }
          color="#ffffff"
        >
          使用说明
        </Tooltip>
      </Menu.Item>
      <Menu.Item>
        <Tooltip placement="rightTop" title={<img width="240" src="https://img.alicdn.com/tfs/TB1X6CSm8Bh1e4jSZFhXXcC9VXa-878-1028.jpg" />} color="#ffffff">
          钉钉服务群
        </Tooltip>
      </Menu.Item>
      <Menu.Item>
        <Tooltip
          className="menu-help-tip"
          placement="rightTop"
          title={
            <div className="menu-help-tip">
              在 <a href="https://dayu.work/home" target="_blank" rel="noreferrer">大禹</a> 上直接提问题
              <br />
              或者直接联系
              <a href="dingtalk://dingtalkclient/action/sendmsg?dingtalk_id=rl7kyea">
                <img src="https://img.alicdn.com/tps/TB1Wk4nOXXXXXXTaXXXXXXXXXXX-13-16.png" /> 然则
              </a>
            </div>
          }
          color="#ffffff"
        >
          直接联系
        </Tooltip>
      </Menu.Item>
    </Menu>
  )
}

// OperationHelp.propTypes = {
//   // typeKey: PropTypes.string,
// }
