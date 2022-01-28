import React from 'react';
import { Menu } from 'antd';
import './Header.less';

const { SubMenu } = Menu;

export default (props) => {
  const { leftMenus = [], rightMenus = [], history } = props;
  const forward = (item) => {
    const link = item.link || '';
    if (history) {
      history.push(link);
    }
  };
  return (
    <div className="header_wrap">
      <div className="header_left">
        <div className="logo_icon">
          <a href="//tfox.gts.work/">
            <img src="https://img.alicdn.com/tfs/TB1_9wMzUY1gK0jSZFMXXaWcVXa-64-64.png" />
          </a>
        </div>
        {leftMenus && leftMenus.length > 0 && (
        <Menu mode="horizontal">
          {(leftMenus || []).map((item) => {
            if (item.data) {
              return (
                <SubMenu title={<span>{item.label}</span>} key={item.key || item.link}>
                  {(item.data || []).map((curChild) => {
                    return (
                      <Menu.Item key={curChild.key} onClick={() => forward(curChild)}>
                        {curChild.label}
                      </Menu.Item>
                    );
                  })}
                </SubMenu>
              );
            } else {
              return (
                <Menu.Item key={item.key || item.link} onClick={() => forward(item)}>
                  {item.label}
                </Menu.Item>
              );
            }
          })}
        </Menu>)}
      </div>
      <div className="header_right">
        {
          rightMenus && rightMenus.length > 0 && (
          <Menu mode="horizontal">
            {(rightMenus || []).map((item) => {
              if (item.data && item.data.length > 0) {
                return (
                  <SubMenu title={<span>{item.title}</span>} key={item.key || item.link}>
                    {(item.data || []).map((curChild) => {
                      return (
                        <Menu.Item key={curChild.key || curChild.link} onClick={() => forward(curChild)}>
                          {curChild.label}
                        </Menu.Item>
                      );
                    })}
                  </SubMenu>
                );
              } else {
                return (
                  <Menu.Item key={item.key || item.link} onClick={() => forward(item)}>
                    {item.label}
                  </Menu.Item>
                );
              }
            })}
          </Menu>)
        }
      </div>
    </div>
  );
};
