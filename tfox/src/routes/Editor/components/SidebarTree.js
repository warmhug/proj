/* eslint max-len: 0, object-property-newline: 0 */
import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'umi';
import { Input, message, Tooltip, Tree } from 'antd';
import { QuestionCircleOutlined, DownOutlined } from '@ant-design/icons';
import { NAMESPACE } from '../../../models/editor';
import './SidebarTree.less';

const uniqKey = (id) => `${id}-${Date.now() + Math.random() * 1000}`;

const createTree = (list) => {
  // const cate1 = groupBy(list, 'category1Id');
  // console.log('ca', cate1);
  const c1 = {}
  const c2 = {}
  const c3 = {}
  list.forEach((item) => {
    const {
      category1Id, category1Name, category2Id, category2Name, category3Id, category3Name,
      metadataId, metadataName, metadataIconUrl, category1SortNum,
    } = item;
    if (!c3[category3Id]) {
      c3[category3Id] = { key: uniqKey(category3Id), children: [], title: category3Name || '未命名', category2Id };
    }
    c3[category3Id].children.push({
      key: uniqKey(metadataId), title: metadataName || '未命名', isLeaf: true,
      icon: metadataIconUrl ?
        <img src={metadataIconUrl} className="sidebar-tree-icon" /> : null,
      metadataId, category1Id, category2Id, category3Id,
    });
    if (!c2[category2Id]) {
      c2[category2Id] = { key: uniqKey(category2Id), title: category2Name || '未命名', category1Id, selectable: false };
    }
    c2[category2Id].children = Object.values(c3).filter(ii => ii.category2Id === category2Id);
    if (!c1[category1Id]) {
      c1[category1Id] = { key: uniqKey(category1Id), title: category1Name || '未命名', sort: category1SortNum, selectable: false };
    }
    c1[category1Id].children = Object.values(c2).filter(ii => ii.category1Id === category1Id);
  });
  // console.log('ccc', c1);
  return Object.values(c1);
}

const updateTreeData = (list, key, children) => {
  // console.log(list);
  return list.map((node) => {
    if (node.key === key) {
      return { ...node, children, selectable: false };
    } else if (node.children) {
      return { ...node, children: updateTreeData(node.children, key, children), selectable: false };
    }
    return node;
  });
}

const formatTns = ({ categoryVOList, metadataVOList }) => {
  const tns = [
    ...(categoryVOList || []).map(({ categoryId, categoryName }) => ({
      key: uniqKey(categoryId), title: categoryName,
    })),
    // TODO 当 source === 'cloud' 时加 特殊标记
    ...(metadataVOList || []).map(({ metadataId, metadataName, metadataIconUrl }) => ({
      key: uniqKey(metadataId), title: metadataName, isLeaf: true, metadataId,
      icon: metadataIconUrl ?
        <img src={metadataIconUrl} className="sidebar-tree-icon" /> : null,
    })),
  ];
  return tns;
}

export default ({ onSelect }) => {
  const dispatch = useDispatch();
  const { metaTns, metaTree } = useSelector((state) => state[NAMESPACE]);
  const [metas, setMetas] = useState([])
  const [lkey, setLkey] = useState(null)
  const [sd, setSd] = useState(false)
  const [preSelID, setPreSelId] = useState(null)

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/getMetaTns`,
    });
  }, [dispatch]);

  useEffect(() => {
    const ftns = formatTns(metaTns)
    const treeData = updateTreeData(metas.length ? metas : ftns, lkey, ftns)
    setMetas(treeData);
  }, [metaTns]);

  const onLoadData = (node) => {
    const { key, children } = node;
    setLkey(key);
    return new Promise((resolve) => {
      if (children) {
        resolve();
        return;
      }
      dispatch({
        type: `${NAMESPACE}/getMetaTns`,
        payload: { categoryId: parseInt(key?.split('-')[0], 10) }, // 测试数据 928
        callback: () => {
          // setMetas(updateTreeData(metas, key, formatTns(res)));
          resolve();
        },
      });
    })
  }

  const onSearch = (value) => {
    if (!value) {
      return;
    }
    setSd(true)
    dispatch({
      type: `${NAMESPACE}/getMetaTree`,
      payload: { name: value },
    });
  };

  const onSelectTreeNode = (_selectedKeys, extra) => {
    // 选择元数据时添加节点
    if (extra.node.isLeaf) {
      const selId = extra.selectedNodes[0]?.metadataId || preSelID;
      if (extra.selected) {
        setPreSelId(selId)
      }
      dispatch({
        type: `${NAMESPACE}/getMetadata`,
        payload: { id: selId },
      }).then((res) => {
        if (res.success) {
          onSelect(res.data);
        } else {
          message.error('当前 id 没有最新的详细数据');
        }
      });
    }
  };

  const td = useMemo(() => {
    return createTree(metaTree);
  }, [metaTree])

  const treeProp = !sd ? { treeData: metas, loadData: onLoadData } : { treeData: td }

  return (
    <div className="sidebar-tree">
      <div className="sidebar-tree-desc">
        <span>产品数据</span>
        <Tooltip
          placement="rightTop"
          title={
            <div className="sidebar-tooltip">
              <div>元数据使用说明：</div>
              1. 不需要拖拽，直接点击、即可自动在画布添加数据节点 <br />
              2. 也可以“选中”画布中某节点、再点击数据，可替换选空节点或在其右侧新增节点
            </div>
          }
          color="#ffffff"
        >
          <QuestionCircleOutlined className="sidebar-tooltip-icon" />
        </Tooltip>
      </div>
      <div className="sidebar-tree-search">
        <Input.Search
          size="small"
          placeholder="请输入"
          allowClear
          onChange={e => !e.target.value && setSd(false)}
          onSearch={val => onSearch(val)}
        />
      </div>
      <Tree
        showIcon
        switcherIcon={<DownOutlined />}
        onSelect={onSelectTreeNode}
        {...treeProp}
      />
    </div>
  );
};

// SidebarTree.propTypes = {
//   onSelect: PropTypes.func,
// };

