
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

let codes = "() => {\n  const dataSource = [\n    {\n      key: '1',\n      shopId: 'SH001',\n      shopName: '但是幅度',\n      shopType: ' 似懂非懂'\n    },\n    {\n      key: '2',\n      shopId: 'SH002',\n      shopName: 'aa',\n      shopType: 'aa'\n    },\n    {\n      key: '3',\n      shopId: 'SH003',\n      shopName: '专卖店C',\n      shopType: '第三方第三方'\n    }\n  ];\n\n  const columns = [\n    {\n      title: '防守打法的',\n      dataIndex: 'shopId',\n      key: 'shopId',\n      width: 100\n    },\n    {\n      title: '似懂非懂',\n      dataIndex: 'shopName',\n      key: 'shopName',\n      width: 200\n    },\n    {\n      title: '神鼎飞丹砂',\n      dataIndex: 'shopType',\n      key: 'shopType',\n      width: 180\n    }\n  ];\n\n  return (\n    <div id=\"ai-create-page\">\n      <Modal\n        className=\"ai-create-page\"\n        getContainer={false}\n        mask={false}\n        title=\"提醒\"\n        visible={true}\n        footer={[\n          <Button key=\"cancel\">取消</Button>,\n          <Button key=\"continue\" type=\"primary\" style={{ marginLeft: '8px' }}>\n             水电费第三方第三方的\n          </Button>\n        ]}\n        style={{ top: '50%', transform: 'translateY(-50%)' }}\n      >\n        <div style={{ marginBottom: '16px', color: 'rgba(0, 0, 0, 0.45)' }}>\n          佛挡杀佛水电费\n        </div>\n        <Table\n          dataSource={dataSource}\n          columns={columns}\n          pagination={false}\n          size=\"small\"\n          style={{ border: '1px solid #f0f0f0' }}\n        />\n      </Modal>\n    </div>\n  );\n}";

// codes = ''

export default codes;
