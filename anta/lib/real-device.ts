const request = require('request');

function getResult(data: any, resolve: any) {
  const url = `http://slm.dl.alipaydev.com/proxy/action.json?params={"action":"result","id":${data.details.taskId}}`;
  // 轮询 检测结果
  // todos: 超时取消
  let timer: any;
  const loop = () => {
    request(url, function (error: any, response: any, body: any) {
      if (error) {
        // console.error('检测任务状态失败');
        return;
      }
      // console.log('statusCode:', response && response.statusCode);
      const jsonRes = JSON.parse(body);
      if (jsonRes.result) {
        clearTimeout(timer);
        getLhResult(jsonRes, resolve);
      } else {
        timer = setTimeout(loop, 15000);
      }
    });
  };
  loop();
}

function getLhResult(res: any, resolve: any) {
  if (res.details.details[0]) {
    if (res.details.details[0].result === 'Failed') {
      // console.log('检测失败');
      resolve(getRes(false, '检测失败'));
      return;
    }
    const atts = res.details.details[0].attachments
    const pros = [];
    for (let index = 0; index < Object.keys(atts).length; index++) {
      const ks = Object.keys(atts)[index];
      // ks like lighthouse-1520400573480-result.json
      // 也可以直接使用 lighthouse_result_mapping.json 的数据
      if (/lighthouse-\d+-result.json/.test(ks)) {
        pros.push(new Promise(reso => request(
          `http://slm.dl.alipaydev.com/artifacts${atts[ks]}`,
          (error: any, response: any, body: any) => {
            if (error) {
              // console.error('检测任务状态失败');
              return reso(getRes(false, '检测任务状态失败'));
            }
            // console.log('lh result', body);
            return reso(getRes(true, '返回数据成功', JSON.parse(body)));
          })
        ));
      }
    }
    Promise.all(pros).then(res => resolve(res));
  } else {
    // console.log('have result', res);
    resolve(getRes(false, '没有结果'));
  }
}

function getRes(flag: boolean, message?: string, res?: any) {
  return {
    success: flag,
    message,
    runs: res ? [res] : [],
    initialUrl: res ? res.initialUrl : undefined,
  };
}

module.exports = function (urls: Array<string>) {
  return new Promise((resolve) => {
    request.post({
      url: 'http://slm.dl.alipaydev.com/proxy/action.json',
      form: {
        params: JSON.stringify({
          action: 'INVOKE', // 任务创建
          planId: 896,  // 执行计划ID，写死就行
          name: '然则的lighthouse测试', // 自定义任务名称
          trigger: 'hualei.hl', // 触发人域帐号登录名
          envs: { // 业务变量
            RUNNING_CONFIG: 'https://gw.alipayobjects.com/os/rmsportal/LKACPzrTRdBUuXULpasw.js', // default_uc 或 default_google 或 <customUrl>，表示使用uc/google默认配置或自定义js配置文件的url
            RESULT_MODE: 'json', // 结果类型，json|html
            H5_URL: JSON.stringify(urls) // 指定URL
          },
          devices: [ // 设备申请
            {
              support: 'gift', // 设备用途，这个写死
              brand: 'LGE', // 品牌
              product: 'Nexus 5X' // 型号
            }
          ]
        }),
      }
    }, function (err: any, httpResponse: any, body: any) {
      // console.log('xx', err, httpResponse.status, typeof body);
      if (err) {
        // console.error('发起任务失败');
        resolve(getRes(false, '发起任务失败'));
        return;
      }
      const jsonRes = JSON.parse(body);
      if (jsonRes.result) {
        // resolve(getRes(true, '检测过程，至少需要 5 分钟));
        setTimeout(() => {
          getResult(jsonRes, resolve);
        }, 5 * 60000 + urls.length * 30000);
      }
    });
  });
}
