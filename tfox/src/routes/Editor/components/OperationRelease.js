/* eslint max-len: 0, implicit-arrow-linebreak: 0, no-confusing-arrow: 0, prefer-promise-reject-errors: 0 */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'umi';
import { Button, Form, Input, Modal, Select, Switch, message } from 'antd';
import debounce from 'lodash/debounce';
import { NAMESPACE } from '../../../models/editor';
import Icon from '../../../components/Icon';
import { formatTags } from '../../../utils';

const { Option } = Select;

export default (props) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { graphInfo: { id, name, description, open, tagVOList = [] }, submitInstance } = props;
  const { srhTags, projs } = useSelector(state => state[NAMESPACE])

  const [visible, setVisible] = useState(false);
  const [openVal, setOpenVal] = useState(open);

  useEffect(() => {
    setOpenVal(open);
  }, [open])

  const searchTag = (val) => {
    dispatch({
      type: `${NAMESPACE}/getTagList`,
      payload: { type: 'instance', name: val, pageIndex: 1, pageSize: 20 },
    });
  };

  const searchProj = (val) => {
    dispatch({
      type: `${NAMESPACE}/searchProjects`,
      payload: { keyword: val },
    });
  };

  const instanceOpen = (val) => {
    dispatch({
      type: `${NAMESPACE}/openGraph`,
      payload: { id, open: val, gType: 'instance' },
      callback: (res) => {
        const txt = val ? '公开' : '不公开';
        res ? message.success(`${txt}成功`) : message.error(`${txt}失败`);
        res && setOpenVal(val);
      },
    });
  };

  const onOk = () => {
    form.validateFields().then((values) => {
      // 处理 tag 的增删
      const tags = form.getFieldsValue().tagVOList.map(it => ({ tagId: it.value, tagName: it.label }));
      const payload = { type: 'instance', pid: id };
      payload.deleteTagIds = tagVOList.filter(i => !tags.find(tv => i.tagName === tv.tagName)).map(i => i.tagId)
      const added = tags.filter(tf => !tagVOList.find(tv => tf.tagName === tv.tagName))
      // 偷懒利用 Select 组件默认新增的 tagId 和 tagName 一样的特性
      payload.addTagIds = added.filter(ae => ae.tagId !== ae.tagName).map(ae => ae.tagId)
      payload.addTagNames = added.filter(ae => ae.tagId === ae.tagName).map(ae => ({ name: ae.tagName }));

      const makePromise = fn =>
        new Promise((resolve, reject) =>
          fn().then(succ => resolve(succ), () => reject(false)).catch(() => false));

      const pAll = [];
      if (payload.deleteTagIds.length || added.length) {
        pAll.push(makePromise(() => dispatch({
          type: `${NAMESPACE}/relationTag`,
          payload,
          callback: (succ) => succ ? message.success('标签设置成功') : message.error('标签设置失败'),
        })));
      }

      const { name: na, description: des, proj } = values || {};
      pAll.push(makePromise(() => dispatch({
        type: `${NAMESPACE}/updateInstance`,
        payload: { id, name: na, description: des },
        callback: (succ) => succ ? message.success('修改名称成功') : message.error('修改名称失败'),
      })));
      pAll.push(makePromise(() => dispatch({
        type: `${NAMESPACE}/instanceRelate`,
        payload: { instanceId: id, projectRelateDTOs: (proj && proj.value) ? [{ projectId: proj.value }] : [] },
        callback: (succ) => succ ? message.success('关联项目成功') : message.error('关联项目失败'),
      })));

      Promise.all(pAll).then((res) => {
        // console.log(res);
        if (!res.includes(false)) {
          message.success('发布成功！')
          // form.resetFields();
          setVisible(false)
        } else {
          message.error('部分修改失败');
        }
      });
    })
    // .catch((info) => console.log(info));
  }

  const showModal = () => {
    submitInstance((succ) => {
      if (!succ) {
        message.error('当前图形未提交成功');
        return;
      }
      setVisible(true);
      searchProj();
      form.setFieldsValue({
        name: name !== '未命名' ? name : '',
        description,
        tagVOList: formatTags(tagVOList),
      });
      dispatch({
        type: `${NAMESPACE}/getByInstanceId`,
        payload: { instanceId: id },
        callback: (success, res) => {
          if (success && res && res.length) {
            form.setFieldsValue({
              proj: {
                value: res[0].projectId || res[0].businessProjectId,
                label: res[0].projectName || res[0].businessProjectName,
              },
            });
          }
        },
      });
    }, true);
  };

  const modal = (
    <Modal
      className="release-dialog"
      title={<>发布<span className="subtit">可多次发布</span></>}
      visible={visible}
      onOk={onOk}
      onCancel={() => setVisible(false)}
      destroyOnClose
      okText="确认"
      cancelText="取消"
      keyboard={false}
      closable={false}
    >
      <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
        <Form.Item
          label="名称"
          name="name"
          rules={[{ required: true, whitespace: true, message: '名称不能为空!' }]}
        >
          <Input placeholder="输入名称" />
        </Form.Item>
        <Form.Item label="描述:" name="description" >
          <Input.TextArea placeholder="请输入" />
        </Form.Item>
        <Form.Item label="标签:" name="tagVOList">
          <Select
            getPopupContainer={(node) => node.parentNode}
            mode="tags"
            labelInValue
            name="tagVOList"
            onSearch={(val) => searchTag(val)}
            placeholder="选择或新增标签"
          >
            {srhTags.map(i => (
              <Option key={i.id} value={`${i.id}`}>{i.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="关联项目" name="proj">
          <Select
            getPopupContainer={(node) => node.parentNode}
            placeholder="关联项目(集)"
            showSearch
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            notFoundContent={null}
            labelInValue
            allowClear
            onSearch={debounce((val) => searchProj(val), 200)}
          >
            {projs.map(({ _indent, collection, projectId, projectName }, index) => (
              <Option key={index.toString()} value={projectId}>
                <span className={`${_indent ? 'indent' : ''} ${collection ? 'collection' : ''}`}>{projectName}</span>
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="是否公开">
          {/* <Form.Item noStyle></Form.Item> */}
          <Switch
            checked={openVal}
            onChange={(val) => instanceOpen(val)}
          />
          <span className="open-note">公开后所有有权限用户可见</span>
        </Form.Item>
      </Form>
    </Modal>
  );

  return (
    <>
      <Button className="bt80" size="small" onClick={() => showModal()}>
        <Icon className="icon" type="zhifeiji_fabu" size="small" />
        发布
      </Button>
      {modal}
    </>
  )
};

// OperationRelease.propTypes = {
//   graphInfo: PropTypes.objectOf(PropTypes.any),
//   submitInstance: PropTypes.func,
// };

