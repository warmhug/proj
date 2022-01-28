import React from 'react';
import { Link } from 'umi';
import { Dropdown, Menu } from 'antd';
import './index.less';

const datas = [
  {
    id: '00',
    title: '',
    desc: '',
  },
  {
    id: '01',
    title: '标准化',
    desc: '统一字体、样式、产品图标、名称等设计元素；统一结构、模块划分、格式、专业话术等',
  },
  {
    id: '02',
    title: '在线化',
    desc: '本地 PPT 文件转移到线上进行数字化；拉通产品相关数据、线上分享及编辑',
  },
  {
    id: '03',
    title: '快速智能',
    desc: '快速地生成架构图，智能推荐范例架构图，推送常用关键词、产品搭配',
  },
  {
    id: '04',
    title: '数字化管理',
    desc: '监测优选架构图情况，云产品在架构中的运用情况，以及新输入的字段分析和1000+项目的架构情况等',
  },
]

export default () => {
  const overlay = <Menu><Menu.Item><Link to="/editor1">绘制“自由”架构图(测试)</Link></Menu.Item></Menu>
  return (
    <div className="design-home">
      <div className="main">
        <div className="btns">
          <div className="name">天狐 | 快速的架构图生成器</div>
          <div className="info">
            快速生成 “标准化” 架构图。<br />
            在线、规范、协同、高效。<br />
            兼容类似 draw.io 的自由绘制功能。
          </div>
          <div className="link">
            <Dropdown overlay={overlay} placement="bottomLeft" arrow>
              <Link to="/editor" className="to-add">搭建“标准”架构图</Link>
            </Dropdown>
            <Link to="/graph" className="to-list">架构图范例库</Link>
          </div>
        </div>
        <div className="feature">
          {datas.map(item => (
            <div key={item.id} className="item">
              <div className="title">{item.title}</div>
              <div className="desc">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="des-list">
        <div className="des-item">
          <div className="des-pic">
            <img src="https://img.alicdn.com/imgextra/i2/O1CN013o028I1i6IgIEC4Ma_!!6000000004363-2-tps-1242-688.png" />
          </div>
          <div className="des-txt">
            <h3>无需从0搭建，可查找丰富的业务架构范例库</h3>
            <p>在业务架构范例库内，我们为您提供多种样式的架构图范例。您可查看丰富的业务架构图进行参考，同时选择使用模版进行编辑。收藏及保存为自定义模版。</p>
          </div>
        </div>
        <div className="des-item">
          <div className="des-txt">
            <h3>预置产品名称、图标及样式，为您快速生成业务架构图</h3>
            <p>无需线下查找产品icon和名称，我们为您提供强大的产品元数据及标准的阿里云产品icon库，方便您线上搜索并可直接选择推荐色板。同时，可选择快速生成，一键生成多个已调整好样式的模块，高效搭建。</p>
          </div>
          <div className="des-pic">
            <img src="https://img.alicdn.com/imgextra/i1/O1CN01wknUWF1vzngJL5C6J_!!6000000006244-2-tps-1302-694.png" />
          </div>
        </div>
        <div className="des-item">
          <div className="des-pic">
            <img src="https://img.alicdn.com/imgextra/i1/O1CN01bY0xGs1hjrH7gyuzf_!!6000000004314-2-tps-1248-722.png" />
          </div>
          <div className="des-txt">
            <h3>数字化管理海量业务架构图</h3>
            <p>线上高效管理架构图，及时查看架构图的使用情况，云产品在结构中的运用情况以及监管交付场景下架构图质量等，从而帮助您调整优化架构，搭建更符合业务场景的架构。</p>
          </div>
        </div>
      </div>
    </div>
  )
}
