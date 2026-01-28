
export const codeDemos = [
  `
<h3 style={{
  background: 'darkslateblue',
  color: 'white',
  padding: 8,
  borderRadius: 4
}}>
  Hello World! 👋
</h3>
  `,
  `
  () => {
    console.log('React.useState', React.useState);
    return (
      <div>aaa</div>
    )
  }
  `,
  `
  () => {
    const [likes, increaseLikes] = React.useState(0);
    return (
      <>
        <p>{\`\${likes} likes\`}</p>
        <button onClick={() => increaseLikes(likes + 1)}>Like</button>
      </>
    );
  };
  `,
  'const badVariable = ;',
  `
  (
    <div>
      <Button>aa</Button>
      <div>
        <Modal visible={true} getContainer={false} />
      </div>
    </div>
  );
  `
];

const codesArr = [
  "() => {\n  const dataSource = [\n    {\n      key: '1',\n      shopId: 'SH001',\n      shopName: '但是幅度',\n      shopType: ' 似懂非懂'\n    },\n    {\n      key: '2',\n      shopId: 'SH002',\n      shopName: 'aa',\n      shopType: 'aa'\n    },\n    {\n      key: '3',\n      shopId: 'SH003',\n      shopName: '专卖店C',\n      shopType: '第三方第三方'\n    }\n  ];\n\n  const columns = [\n    {\n      title: '防守打法的',\n      dataIndex: 'shopId',\n      key: 'shopId',\n      width: 100\n    },\n    {\n      title: '似懂非懂',\n      dataIndex: 'shopName',\n      key: 'shopName',\n      width: 200\n    },\n    {\n      title: '神鼎飞丹砂',\n      dataIndex: 'shopType',\n      key: 'shopType',\n      width: 180\n    }\n  ];\n\n  return (\n    <div id=\"ai-create-page\">\n      <Modal\n        className=\"ai-create-page\"\n        getContainer={false}\n        mask={false}\n        title=\"提醒\"\n        visible={true}\n        footer={[\n          <Button key=\"cancel\">取消</Button>,\n          <Button key=\"continue\" type=\"primary\" style={{ marginLeft: '8px' }}>\n             水电费第三方第三方的\n          </Button>\n        ]}\n        style={{ top: '50%', transform: 'translateY(-50%)' }}\n      >\n        <div style={{ marginBottom: '16px', color: 'rgba(0, 0, 0, 0.45)' }}>\n          佛挡杀佛水电费\n        </div>\n        <Table\n          dataSource={dataSource}\n          columns={columns}\n          pagination={false}\n          size=\"small\"\n          style={{ border: '1px solid #f0f0f0' }}\n        />\n      </Modal>\n    </div>\n  );\n}",
  "() => {\n  return (\n    <div id=\"ai-create-page\">\n      <Drawer\n   visible     title=\"拓展方式\"\n        placement=\"right\"\n        width={400}\n        className=\"ai-create-page\"\n        getContainer={false}\n        mask={false}\n        style={{\n          position: 'absolute',\n          right: 0,\n          top: 0,\n          height: '100vh'\n        }}\n      >\n        <Tabs defaultActiveKey=\"1\" style={{ marginBottom: '60px' }}>\n          <Tabs.TabPane tab=\"语种翻译\" key=\"1\">\n            <div style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>\n              支持翻译50+语种\n            </div>\n            <div style={{ \n              display: 'grid', \n              gridTemplateColumns: 'repeat(3, 1fr)', \n              gap: '8px',\n              maxHeight: '300px',\n              overflowY: 'auto'\n            }}>\n              {[\n                '中文', '英文', '日文', '韩文', '法文', '德文', \n                '西班牙文', '俄文', '意大利文', '葡萄牙文', '阿拉伯文', '荷兰文'\n              ].map((lang, index) => (\n                <Card \n                  key={index} \n                  size=\"small\" \n                  style={{ \n                    textAlign: 'center', \n                    cursor: 'pointer',\n                    border: '1px solid #d9d9d9',\n                    transition: 'all 0.3s'\n                  }}\n                  bodyStyle={{ padding: '12px 8px' }}\n                >\n                  <div style={{ fontSize: '13px', fontWeight: 500 }}>{lang}</div>\n                </Card>\n              ))}\n            </div>\n          </Tabs.TabPane>\n          \n          <Tabs.TabPane tab=\"词形变化\" key=\"2\">\n            <div style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>\n              数字或符号形变\n            </div>\n            <Radio.Group style={{ width: '100%' }}>\n            </Radio.Group>\n          </Tabs.TabPane>\n          \n          <Tabs.TabPane tab=\"搜推关联\" key=\"3\">\n            <div style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>\n              挖掘搜索关联词\n            </div>\n            <div style={{ marginBottom: '16px' }}>\n              <Input placeholder=\"请输入关键词\" />\n            </div>\n            <div style={{ marginBottom: '8px', fontSize: '14px', color: '#333' }}>\n              关联度调节\n            </div>\n            <Slider \n              defaultValue={50} \n              style={{ marginBottom: '16px' }}\n            />\n          </Tabs.TabPane>\n        </Tabs>\n        \n        <div style={{ \n          position: 'absolute', \n          bottom: 20, \n          left: 20, \n          right: 20,\n          display: 'flex', \n          gap: '12px',\n          paddingTop: '16px',\n          borderTop: '1px solid #f0f0f0'\n        }}>\n          <Button style={{ flex: 1 }}>取消</Button>\n          <Button type=\"primary\" style={{ flex: 1 }}>确认</Button>\n        </div>\n      </Drawer>\n    </div>\n  );\n}"
];

export default codesArr;
