/* eslint max-len: 0, react/no-danger: 0 */
import React, { useEffect, useState } from 'react';
import { Button, Tag, Tooltip } from 'antd';
import { EllipsisOutlined, EyeOutlined } from '@ant-design/icons';
import { Link } from 'umi';
import moment from 'moment';
import Icon from '../Icon';
import './index.less';

const getTags = (item) => {
  const tags = [];
  item.typeKey === 'freedom' && tags.push('自由绘制');
  if (item.tagVOList) {
    item.tagVOList.forEach((tvo) => tags.push(tvo.tagName));
  }
  return tags;
}

export default ({
  gType = 'instance', // template | instance
  dataSource = {},
  loading = false,
  showMore = true,
  btn = {},
  onClickCard = () => { },
  onDel = () => { },
  onOpen = () => { },
  loadMore = () => { },
  delId,
  openId,
}) => {
  const { records, total, current, size } = dataSource;
  const { text, urlKey, icon } = btn;
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    if (!current) {
      return;
    }
    const recs = records || [];
    setAllData(current > 1 ? [...allData, ...recs] : [...recs]);
  }, [records, current]);

  useEffect(() => {
    // console.log('record add');
    let list = [...allData];
    if (delId) {
      list = list.filter(item => item.id !== delId);
    }
    if (openId) {
      list.forEach(ii => {
        const item = ii;
        if (item.id === openId) {
          item.open = !item.open;
        }
      })
    }
    setAllData(list);
  }, [delId, openId]);

  useEffect(() => {
    return () => setAllData([])
  }, []);

  let info = ''
  if (!total && !allData.length && !loading) {
    info = '暂无数据';
  } else if (loading) {
    info = '加载中...';
  } else if (allData.length === total) {
    // TODD 删除后 length 不一致
    info = '';
  } else {
    // const pageIndex = current + 1;
    const pageIndex = parseInt(allData.length / size, 10) + 1;
    info = <Button type="primary" onClick={() => loadMore(pageIndex)}>加载</Button>
  }
  // console.log('info', info);

  const graph = rec => (
    <>
      <div
        className={`thumbnail ${rec.fileString ? '' : 'nothing'}`}
        dangerouslySetInnerHTML={{ __html: rec.fileString }}
      />
      {/* <img src={`data:image/svg+xml;utf8,${(rec.fileString)}`} /> */}
      {/* <img src={`data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(rec.fileString)))}`} /> */}
    </>
  );

  return (
    <div className="gcards-wrap">
      <div className="gcards">
        {!showMore && (
          <div className="gcard addfirst" onClick={() => onClickCard({})}>
            <Icon type="build" />
            <div>新建</div>
          </div>
        )}
        {allData.map(rec => (
          <div className="gcard" key={rec.id} onClick={() => onClickCard(rec)}>
            <div className="gcard-con">
              <div className="gcard-tags">
                {getTags(rec).map((tag, idx) => (
                  <Tag key={idx.toString()} className="tag" size="small">{tag}</Tag>
                ))}
              </div>
              {graph(rec)}
              {showMore && (
                <div className="subbox">
                  <Link to={`/${rec.typeKey === 'freedom' ? 'editor1' : 'editor'}?${urlKey}=${rec.id}&type=${gType}`}>
                    <Button type="primary">
                      {icon ? <Icon className="gcard-icon" type="bianji" size="xs" /> : null}
                      {text}
                    </Button>
                  </Link>
                  <Link to={`/preview?id=${rec.id}&type=${gType}`}>查看</Link>
                </div>
              )}
            </div>
            <div className="gcard-info">
              {urlKey ? (
                <>
                  <div className="flexblock">
                    <span className="name">{rec.name || '未命名'}</span>
                    {rec.totalPv > 0 &&
                      <div title="浏览量"><EyeOutlined /><span className="pvcount">{rec.totalPv}</span></div>}
                  </div>
                  {rec.description && <div className="desc">描述：{rec.description}</div>}
                  <div className="flexblock">
                    <div className="grayinfo">
                      <span>{rec.creatorName}</span>
                      {moment(rec.gmtModified).format('YYYY-MM-DD_HH:mm')} 更新
                    </div>
                    {rec.own &&
                      <Tooltip
                        placement="bottom"
                        title={
                          <div className="gcard-ops">
                            {/* <Link target="_blank" to={`/preview?id=${rec.id}&type=${gType}`}>
                              <Button type="text" size="small">查看</Button>
                            </Link> */}
                            {rec.own &&
                              <Button type="text" size="small" onClick={() => onDel(rec, gType)}>删除</Button>}
                            {rec.own && (
                              <Button type="text" size="small" onClick={() => onOpen(rec, gType)}>
                                {rec.open ? '不公开' : '公开'}
                              </Button>
                            )}
                          </div>
                        }
                        color="#ffffff"
                      >
                        <EllipsisOutlined />
                      </Tooltip>
                    }
                  </div>
                </>
              ) : (
                <>
                  <div className="flexblock">
                    <div className="label">{rec.name}</div>
                    <div className="grayinfo">
                      <span>{rec.creatorName}</span>
                      {moment(rec.gmtModified).format('YYYY-MM-DD_HH:mm')}更新
                    </div>
                  </div>
                  {rec.description && <div className="desc" title={rec.description}>描述：{rec.description}</div>}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="gcards-pager">
        <div className="gcards-pager-btn">{info}</div>
      </div>
    </div>
  )
}

