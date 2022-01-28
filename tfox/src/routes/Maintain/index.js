/* eslint max-len: 0, no-confusing-arrow: 0, object-property-newline: 0 */
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector, Link } from 'umi'
import {
  Button, Modal, Select, Table, Upload, Form, Input, InputNumber, message,
} from 'antd'
import moment from 'moment'
import IconSearch from '../../components/IconSearch'
import { NAMESPACE } from '../../models/maintain'
// import { NAMESPACE as appNS } from '../../models/app'
import { NAMESPACE as editorNS } from '../../models/editor'
import { formatTags } from '../../utils';
import { uploadFile, getTypeList } from '../../models/services';
import './index.less'

const FormItem = Form.Item;
const { Option } = Select;

export default () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch()
  const {
    metaData, iconData, newIconData, typeList, checkList,
  } = useSelector(state => state[NAMESPACE])
  const { srhTags } = useSelector(state => state[editorNS])
  // const { dayuInfo } = useSelector(state => state[appNS])
  const [visible, setVisible] = useState(false)
  const [editingRow, setEditingRow] = useState({})
  const [tickList, setTickList] = useState([])
  const [disabled, setDisabled] = useState(false)
  const [iconModal, setIconModal] = useState(false)
  const [imgUrl, setImgUrl] = useState('')
  const [showBigImg, setShowBigImg] = useState(false);
  const [secondCategoryList, setSecondCategoryList] = useState([]);
  const [thirdCategoryList, setThirdCategoryList] = useState([]);

  // 查询列表
  const onQuery = useCallback((obj = {}, isIcon, nIcon) => {
    dispatch({
      type: `${NAMESPACE}/${isIcon ? 'getIconList' : 'getMetadataList'}`,
      payload: { pageIndex: 1, pageSize: 10, ...obj },
      newIconData: nIcon,
    })
  }, [dispatch])

  useEffect(() => {
    onQuery()
    onQuery({}, true)
  }, [dispatch, onQuery])

  useEffect(() => {
    dispatch({ type: `${NAMESPACE}/getCheckList` })
  }, [dispatch])

  const submitForm = (values) => {
    if (iconModal) {
      const payload = {
        ...values,
        id: editingRow?.id,
      }
      dispatch({
        type: `${NAMESPACE}/${editingRow.id ? 'updateIcon' : 'addIcon'}`,
        payload,
        callback: (success) => {
          if (success) {
            form.resetFields();
            const msg = editingRow.id ? '更新成功' : '新建成功';
            message.success(msg)
            setVisible(false)
            onQuery({}, true)
          }
        },
      })
    } else {
      const payload = {
        addSecondCategoryName: {},
        addThirdCategoryName: {},
        tagIds: [],
        addTagNames: [],
        ...values,
        id: editingRow?.id,
      };
      if (editingRow.id) {
        // 编辑
        // payload.addTagIds = addTagIds
        // payload.addTagNames = addTagNames
        // payload.deleteTagIds = deleteTagIds
      } else {
        // 新建
      }
      Modal.confirm({
        title: `确认${editingRow.id ? '编辑' : '新增'}内容`,
        onOk: () => {
          dispatch({
            type: `${NAMESPACE}/${editingRow.id ? 'updateMetadataList' : 'addMetadataList'}`,
            payload,
            callback: (success) => {
              if (success) {
                form.resetFields();
                setVisible(false)
                onQuery({ pageIndex: metaData.pageIndex })
              } else {
                message.success('操作失败')
              }
            },
          })
        },
      });
    }
  }

  // 点击确定
  const onOK = () => {
    form.validateFields().then((values) => {
      submitForm(values);
    })
    // .catch((info) => console.log(info));
  }
  const handelChange = async (value, type) => {
    const result = await getTypeList({ categoryId: value });
    const { data } = result;
    if (result.success) {
      if (form.getFieldsValue().firstCategoryId && type === 'second') {
        setSecondCategoryList(data?.categoryVOList);
        // form.setFieldsValue({ secondCategoryId: data?.categoryVOList[0]?.categoryId });
      }
      if (form.getFieldsValue().secondCategoryId && type === 'third') {
        setThirdCategoryList(data?.categoryVOList)
      }
    }
  }

  const imgOverlayChange = (val) => {
    setImgUrl(val)
    setShowBigImg(!!val)
  }

  // 新建
  const onBuild = (isIcon) => {
    setImgUrl('');
    setEditingRow({});
    setVisible(true);
    setIconModal(isIcon);
    setDisabled(false);
    if (!isIcon) {
      dispatch({
        type: `${NAMESPACE}/getTypeList`,
      });
    }
  }

  // 编辑
  const editRow = (record, isIcon) => {
    setVisible(true)
    setIconModal(isIcon)
    setEditingRow(record)
    if (!isIcon) {
      const { source, firstCategoryId, secondCategoryId, thirdCategoryId, tagVOList } = record;
      if (firstCategoryId) {
        form.getFieldsValue({ firstCategoryId });
        dispatch({
          type: `${NAMESPACE}/getTypeList`,
        });
      }
      if (firstCategoryId && secondCategoryId) {
        handelChange(firstCategoryId, 'second');
        form.getFieldsValue({ secondCategoryId });
      }
      if (firstCategoryId && secondCategoryId && thirdCategoryId) {
        handelChange(secondCategoryId, 'third');
        form.getFieldsValue({ thirdCategoryId });
      }
      setDisabled(source === 'cloud');
      form.setFieldsValue({ ...record, tagVOList: formatTags(tagVOList) });
    } else {
      const { url, tagVOS } = record;
      setImgUrl(url);
      form.setFieldsValue({ ...record, tagVOS: formatTags(tagVOS) });
    }
  }

  // 取消/关闭
  const onClose = () => {
    form.resetFields();
    setVisible(false)
    imgOverlayChange('')
    dispatch({ type: `${NAMESPACE}/updateState`, payload: { newIconData: {} } });
  }

  const searchTag = (value, type) => {
    dispatch({
      type: `${NAMESPACE}/getTagList`,
      payload: {
        name: value,
        pageIndex: 1,
        pageSize: 20,
        type: type === 'icon' ? 'icon' : 'relation',
      },
    })
  }

  // 删除
  const onDelete = () => {
    if (tickList.length === 0) {
      message.error('请勾选')
    } else {
      Modal.confirm({
        title: '确认删除',
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
          dispatch({
            type: `${NAMESPACE}/deleteMetaList`,
            payload: { ids: tickList },
            callback: (success) => {
              if (success) {
                setTickList([])
                onQuery()
                message.success('删除成功')
              } else {
                message.error('删除失败')
              }
            },
          })
        },
      })
    }
  }

  // const onChange = (value, actionType, level) => {
  //   if (actionType === 'change') {
  //     // 模糊搜索
  //     dispatch({
  //       type: `${NAMESPACE}/getCatalogLevel`,
  //       payload: { name: value, level },
  //     })
  //   }
  // }

  const agree = (rec) => {
    // 搜索 inReview 关键字 发请求
    dispatch({
      type: `${editorNS}/modifyTemplate`,
      payload: { id: rec.id, status: 'open' },
      callback: (success) => {
        success ? message.success(`${rec.name} 审核通过`) : message.error('接口返回失败');
        success && dispatch({ type: `${NAMESPACE}/getCheckList` });
      },
    })
  }
  const refuse = (rec) => {
    Modal.confirm({
      title: `${rec.name} 审核不通过`,
      content: (
        <div>
          原因：<Input.TextArea />
        </div>
      ),
    })
  }

  const metaCols = [
    { dataIndex: 'source', title: '数据来源', render: txt => txt === 'local' ? '本地创建' : '云知' },
    { dataIndex: 'code', title: '元数据code' },
    { dataIndex: 'shortDescription', title: '元数据短描述' },
    { dataIndex: 'enName', title: '元数据英文名称' },
    { dataIndex: 'longDescription', title: '元数据长描述' },
    { dataIndex: 'introduction', title: '元数据简介' },
    { dataIndex: 'firstCategoryName', title: '一级类别目录' },
    { dataIndex: 'secondCategoryName', title: '二级类别目录' },
    { dataIndex: 'thirdCategoryName', title: '三级类别目录' },
    {
      dataIndex: 'officialWebsite',
      title: '官网url',
      render: txt => (
        <a href={txt} target="_blank" rel="noopener noreferrer">{txt}</a>
      ),
    },
    {
      dataIndex: 'iconUrl',
      title: '元数据图标URL',
      render: txt => (
        <img className="icon" src={txt} onClick={() => imgOverlayChange(txt)} />
      ),
    },
    { dataIndex: 'tagVOList', title: '标签', render: (t, rec) => (rec?.tagVOList || []).map(i => i.tagName).join(',') },
    { dataIndex: 'creatorName', title: '创建人' },
    { dataIndex: 'gmtCreate', title: '创建时间', render: (txt) => moment(txt).format('YYYY-MM-DD') },
    { dataIndex: 'sortNum', title: '排序' },
    { fixed: 'right', title: '操作', render: (t, rec) => <a onClick={() => editRow(rec)}>编辑</a> },
  ]

  const metaForm = [
    { ...metaCols[2], rules: [{ required: true, message: '必填项' }], disabled },
    { ...metaCols[3], rules: [{ required: true, message: '必填项' }], disabled },
    metaCols[4],
    metaCols[5],
    { ...metaCols[9], disabled },
  ];
  const iconCols = [
    { dataIndex: 'source', title: '数据来源', render: txt => txt === 'local' ? '本地创建' : '素材库' },
    { dataIndex: 'name', title: '图标名称', width: 400 },
    {
      dataIndex: 'url',
      title: '图标',
      render: txt => (
        <img className="icon" src={txt} onClick={() => imgOverlayChange(txt)} />
      ),
    },
    { dataIndex: 'tagVOS', title: '标签', render: (t, rec) => (rec?.tagVOS || []).map(i => i.tagName).join(',') },
    { dataIndex: 'creatorName', title: '创建人' },
    { dataIndex: 'gmtCreate', title: '创建时间', render: (txt) => moment(txt).format('YYYY-MM-DD') },
    { fixed: 'right', title: '操作', render: (t, rec) => <a onClick={() => editRow(rec, true)}>编辑</a> },
  ];

  const checkCols = [
    { dataIndex: 'name', title: '地址', render: (t, rec) => <Link to={`/preview?id=${rec.id}&type=template`}>{t}</Link> },
    { dataIndex: 'modifierName', title: '修改人' },
    { dataIndex: 'gmtModified', title: '修改时间', render: (txt) => moment(txt).format('YYYY-MM-DD') },
    { dataIndex: 'description', title: '描述' },
    {
      fixed: 'right',
      title: '操作',
      render: (t, rec) => (
        <div className="opts">
          <Button type="primary" size="small" onClick={() => agree(rec)}>通过</Button>
          <Button size="small" onClick={() => refuse(rec)}>拒绝</Button>
        </div>
      ),
    },
  ];

  // 素材库的数据 部分不可编辑
  const syncS = editingRow.source === 'sync';

  return (
    <div className="maintain">
      <div className="distribution">
        <Input
          allowClear
          placeholder="输入搜索列表"
          onChange={(e) => onQuery({ name: e.target.value })}
        />
        <Button type="primary" onClick={() => onBuild()}>新建</Button>
        <Button type="primary" onClick={onDelete}>删除</Button>
      </div>
      <Table
        className="table"
        dataSource={metaData.records}
        hasBorder={false}
        rowSelection={{
          onChange: (selectedRowKeys) => setTickList(selectedRowKeys),
          getCheckboxProps: record => ({ disabled: record.source === 'cloud' }),
        }}
        pagination={{
          current: metaData.current, pageSize: metaData.size, total: metaData.total,
          hideOnSinglePage: true, showSizeChanger: false,
          onChange: (val) => onQuery({ pageIndex: val }),
        }}
        scroll={{ x: 1800 }}
        rowKey="id"
        size="small"
      >
        {metaCols.map(col => <Table.Column key={col.title} {...col} />)}
      </Table>
      <div className="distribution">
        <Input
          allowClear
          placeholder="输入搜索列表"
          onChange={(e) => onQuery({ name: e.target.value }, true)}
        />
        <Button type="primary" onClick={() => onBuild(true)}>新建</Button>
      </div>
      <Table
        className="table"
        dataSource={iconData.records}
        hasBorder={false}
        pagination={{
          current: iconData.current, pageSize: iconData.size, total: iconData.total,
          hideOnSinglePage: true, showSizeChanger: false,
          onChange: (val) => onQuery({ pageIndex: val }, true),
        }}
        scroll={{ x: 1200 }}
        rowKey="id"
        size="small"
      >
        {iconCols.map(col => <Table.Column key={col.title} {...col} />)}
      </Table>
      <Modal
        className="dialog"
        forceRender
        maskClosable={false}
        destroyOnClose
        visible={visible}
        title={!editingRow.id ? '新建' : '编辑'}
        onOk={() => onOK()}
        onCancel={onClose}
        okText="确认"
        cancelText="取消"
      >
        {iconModal ? (
          <Form form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 18 }}>
            <FormItem label="图标名称" name="name" rules={[{ required: true, message: '必填项' }]}>
              <Input disabled={syncS} name="name" placeholder="请输入" />
            </FormItem>
            <FormItem label="图标地址">
              <div className="inlinec">
                {/* FormItem 里只能放一个 Input 才能给正确设置 value */}
                <FormItem noStyle name="url" rules={[{ required: true, message: '必填项' }]}>
                  <Input
                    allowClear
                    onBlur={(e) => setImgUrl(e.target.value)}
                    disabled={imgUrl || syncS}
                    name="url"
                    placeholder="请输入"
                  />
                </FormItem>
                {imgUrl && <img src={imgUrl} className="icon-thumb" />}
                <Upload
                  customRequest={
                    async (opt) => {
                      const { file = {} } = opt || {};
                      const formData = new FormData();
                      formData.append('fileItem', file);

                      const res = await uploadFile({
                        data: formData,
                      })
                      if (!res?.success) {
                        message.error('上传失败')
                        return;
                      }

                      form && form.setFieldsValue({ url: res.data })
                      setImgUrl(res.data)
                    }
                  }
                  showUploadList={false}
                  disabled={syncS}
                >
                  <Button size="small">上传</Button>
                </Upload>
              </div>
            </FormItem>
            <FormItem label="标签:" name="tagVOS">
              <Select
                mode="tags"
                labelInValue
                name="tagVOS"
                onSearch={(v) => searchTag(v, 'icon')}
                onFocus={e => searchTag(e.target.value, 'icon')}
                placeholder="请选择"
              >
                {srhTags.map(i => (
                  <Option key={i.id} value={i.id}>{i.name}</Option>
                ))}
              </Select>
            </FormItem>
          </Form>
        ) : (
          <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
            {metaForm.map(fi => (
              <FormItem key={fi.dataIndex} name={fi.dataIndex} label={fi.title} rules={fi.rules}>
                <Input disabled={fi.disabled} name={fi.dataIndex} />
              </FormItem>
            ))}
            <FormItem label="元数据图标:">
              <div className="inlinec">
                <IconSearch
                  iconData={newIconData}
                  onSel={(v) => form.setFieldsValue({ iconUrl: v.url })}
                >
                  <Form.Item noStyle name="iconUrl">
                    <Input
                      allowClear
                      placeholder="搜索产品图标或直接填入地址"
                      name="iconUrl"
                      value={form.getFieldsValue().iconUrl}
                      onChange={(e) => {
                        const val = e.target.value;
                        onQuery({ name: val }, true, true)
                        form.setFieldsValue({ iconUrl: val })
                      }}
                    />
                  </Form.Item>
                </IconSearch>
                {form.getFieldsValue().iconUrl && <img src={form.getFieldsValue().iconUrl} className="icon-thumb" />}
              </div>
            </FormItem>
            <FormItem label="排序：" name="sortNum">
              <InputNumber name="sortNum" min={0} placeholder="请输入" />
            </FormItem>
            <FormItem label="标签:" name="tagVOList">
              <Select
                mode="tags"
                labelInValue
                name="tagVOList"
                onSearch={(v) => searchTag(v, 'data')}
                onFocus={e => searchTag(e.target.value, 'data')}
                placeholder="请选择"
              >
                {srhTags.map(i => (
                  <Option key={i.id} value={i.id}>{i.name}</Option>
                ))}
              </Select>
            </FormItem>
            <FormItem label="一级类别目录:" name="firstCategoryId">
              <Select
                disabled={disabled}
                showArrow={false}
                allowClear
                placeholder="前选择一级类别目录"
                value={form.getFieldsValue().firstCategoryId}
                onChange={(value) => { handelChange(value, 'second') }}
              >
                {(typeList || []).map(i => (
                  <Option key={i.categoryId} title={i.categoryId} value={i.categoryId}>
                    {i.categoryName}
                  </Option>
                ))}
              </Select>
            </FormItem>
            <FormItem
              label="二级类别目录:"
              name="secondCategoryId"
              dependencies={['firstCategoryId']}

            >
              {/* <AutoComplete
                disabled={disabled}
                onChange={(value, actionType) => onChange(value, actionType, 2)}
                name="secondCategoryName"
                options={catalogLevelList2}
                placeholder="请选择"
              /> */}
              <Select
                disabled={disabled}
                showArrow={false}
                allowClear
                placeholder="前选择二级级类别目录"
                value={form.getFieldsValue().secondCategoryId}
                onChange={(value) => { handelChange(value, 'third') }}
              >
                {(secondCategoryList || []).map(i => (
                  <Option key={i.categoryId} title={i.categoryId} value={i.categoryId}>
                    {i.categoryName}
                  </Option>
                ))}
              </Select>
            </FormItem>
            <FormItem
              label="三级类别目录:"
              name="thirdCategoryId"
              dependencies={['secondCategoryId']}
            >
              {/* <AutoComplete
                disabled={disabled}
                onChange={(value, actionType) => onChange(value, actionType, 3)}
                name="thirdCategoryName"
                options={catalogLevelList3}
                placeholder="请选择"
              /> */}
              <Select
                disabled={disabled}
                showArrow={false}
                allowClear
                placeholder="前选择三级级类别目录"
                value={form.getFieldsValue().thirdCategoryId}
              >
                {(thirdCategoryList || []).map(i => (
                  <Option key={i.categoryId} title={i.categoryId} value={i.categoryId}>
                    {i.categoryName}
                  </Option>
                ))}
              </Select>
            </FormItem>
          </Form>
        )}
      </Modal>
      <Modal
        className="dialog"
        visible={showBigImg}
        footer={false}
        onCancel={() => setShowBigImg(false)}
      >
        <img src={imgUrl} />
      </Modal>
      <div className="checklist-wrap">
        <h3>审核列表</h3>
        <Table
          className="table"
          dataSource={checkList}
          hasBorder={false}
          rowKey="id"
          size="small"
        >
          {checkCols.map(col => <Table.Column key={col.title} {...col} />)}
        </Table>
      </div>
    </div>
  )
}

