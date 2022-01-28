/* eslint max-len: 0, object-property-newline: 0 */
import React, { useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'umi';
import { Modal, Form, Input, Switch, message } from 'antd';
import { NAMESPACE } from '../../../models/editor';
import { EditorContext, getCurrentXml, getImg, getXmlText } from '../common';

export default (props) => {
  const editor = useContext(EditorContext);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { visible, onVisible, graphInfo, graphRef, typeKey } = props;
  const { temp } = useSelector((state) => state[NAMESPACE]);
  // visible 状态统一由 外部 控制，尝试 双向绑定
  // const [tempVisible, setTempVisible] = useState(visible);

  useEffect(() => {
    if (visible) {
      dispatch({
        type: `${NAMESPACE}/getTempByName`,
        payload: { name: graphInfo.name },
      });
    }
  }, [visible, graphInfo.name, dispatch]);

  const tempExists = (rule, value) => {
    return new Promise((resolve) => {
      if (!value) {
        resolve();
      } else {
        dispatch({
          type: `${NAMESPACE}/getTempByName`,
          payload: { name: value },
          callback: () => {
            resolve();
          },
        });
      }
    });
  };

  const onOk = () => {
    form.validateFields().then((values) => {
      const { name, description, open } = values;
      const { tagVOList } = graphInfo
      const status = open ? 'inReview' : 'self';
      const tagNames = tagVOList ? tagVOList.map((tag) => tag.tagName) : null;
      const getPl = (fileString) => ({
        status, tagNames, typeKey, name, description, fileString,
        xml: getCurrentXml(editor), xmlText: getXmlText(editor.graph, name),
      });
      if (!temp || !temp.id) {
        getImg(editor.graph, graphRef, (fileString) => dispatch({
          type: `${NAMESPACE}/insertTemplate`,
          payload: getPl(fileString),
          callback: (success) => {
            if (success) {
              message.success('成功添加模版');
              form.resetFields();
              onVisible(false);
            }
          },
        }));
      } else {
        Modal.confirm({
          title: '模版名称已存在，是否覆盖',
          okText: '确定',
          cancelText: '取消',
          onOk: () => {
            getImg(editor.graph, graphRef, (fileString) => dispatch({
              type: `${NAMESPACE}/modifyTemplate`,
              payload: { id: temp.id, ...getPl(fileString) },
              callback: (success) => {
                if (success) {
                  message.success('覆盖成功');
                  onVisible(false);
                } else {
                  message.error('覆盖失败');
                }
              },
            }));
          },
        });
      }
    })
  }

  const tempStatus = {
    self: '私有',
    inReview: '审核中',
    open: '审核通过已公开',
  };

  const initialValues = {
    name: graphInfo.name,
    description: graphInfo.description,
    open: false,
  }

  return (
    <Modal
      className="setup"
      title="设为模版"
      visible={visible}
      onOk={onOk}
      onCancel={() => onVisible(false)}
      destroyOnClose
      okText="确认"
      cancelText="取消"
      keyboard={false}
      closable={false}
    >
      <Form form={form} initialValues={initialValues} labelCol={{ span: 5 }} wrapperCol={{ span: 18 }}>
        <Form.Item
          label={'名称:'}
          name="name"
          rules={[
            { required: true, whitespace: true, message: '必填!' },
            () => ({
              async validator(rule, value) {
                await tempExists(rule, value);
              },
            }),
          ]}
          extra={(temp && temp.id ? `该模板已存在，状态是“${tempStatus[temp.status]}”` : '')}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="描述:" name="description" >
          <Input.TextArea placeholder="请输入" />
        </Form.Item>
        <Form.Item label="设为官方模板" >
          <Form.Item name="open" noStyle valuePropName="checked">
            <Switch className="set-open" />
          </Form.Item>
          <span className="tempnote">提交并审核通过、会变成官方推荐模板，否则是私有模板</span>
        </Form.Item>
      </Form>
    </Modal>
  )
}

// OperationSetTemp.propTypes = {
//   visible: PropTypes.bool,
//   onVisible: PropTypes.func,
//   graphInfo: PropTypes.objectOf(PropTypes.any),
//   graphRef: PropTypes.objectOf(PropTypes.any),
//   typeKey: PropTypes.string,
// }

