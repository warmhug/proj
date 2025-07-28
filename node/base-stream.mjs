import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';
import { PassThrough, Readable } from 'node:stream';
import { request as gRequest } from 'gaxios';


await serverSteamError();
// readStream();
// simulateSteam();
// processFileStream();

async function serverSteamError() {
  try {
    console.log('Sending request...');
    const res = await gRequest({
      url: 'http://localhost:3000',
      responseType: 'stream',
      timeout: 5000,
    });
    // 读取流（gaxios 返回的是 Node Readable）
    res.data.on('data', (chunk) => {
      console.log('Received chunk:', chunk.toString());
    });
    res.data.on('end', () => {
      console.log('Stream ended normally');
    });
    res.data.on('error', (err) => {
      // 错误已经消费，不抛出、不reject
      console.error('Stream error caught:', err.message);
    });
    // 或者彻底禁止 error 冒泡
    // res.data.emit = (orig => function(event, ...args) {
    //   if (event === 'error') {
    //     console.log('Suppressed stream error:', args[0]?.message);
    //     return true; // ✅ 直接返回，跳过 error 处理
    //   }
    //   return orig.call(this, event, ...args);
    // })(res.data.emit);
  } catch (err) {
    // 当 响应是 responseType: 'stream' 时，gaxios 会返回一个 Node.js ReadableStream，后续错误是在 流事件里触发的，不会进入 try...catch
    console.error('Request failed:', err.message);
  }
}

function readStream() {
  // 创建一个会“提前关闭”的 PassThrough 流
  const stream = new PassThrough();
  stream.on('error', (err) => {
    console.error('[PassThrough error event]', err.message);
  });
  // 发送部分数据
  stream.write('data: {"response":{"modelVersion":"gemini-2.5-pro1"}}\r\n\r\n');
  // 50ms 后强制关闭流 -> 模拟 Premature close
  setTimeout(() => {
    console.log('Simulating premature close on PassThrough...');
    stream.destroy(new Error('Premature close simulated'));
  }, 50);

  // ✅ 模拟读取逻辑（用 readline 逐行读取）
  const rl = createInterface({
    input: stream,
    crlfDelay: Infinity,
  });
  rl.on('line', (line) => {
    console.log('[line]', line);
  });
  rl.on('close', () => {
    console.log('Stream closed normally');
  });
  stream.on('error', (err) => {
    console.error('Stream error caught:', err.message);
  });
}

function simulateSteam() {
  class TimedStream extends Readable {
    constructor(dataChunks, interval = 1000) {
      super();
      this.dataChunks = dataChunks;
      this.interval = interval;
      this.index = 0;
    }
    _read() {
      if (this.timer) return;
      this.timer = setInterval(() => {
        if (this.index < this.dataChunks.length) {
          this.push(this.dataChunks[this.index]);
          this.index++;
        } else {
          clearInterval(this.timer);
          this.push(null); // end of stream
        }
      }, this.interval);
    }
  }

  // 模拟 SSE 风格的数据块
  const chunks = [
    'data: {\n  "response": {\n    "modelVersion": "gemini-2.5-pro1"\n  }\n}\r\n\r\n',
    'data: {\n  "response": {\n    "modelVersion": "gemini-2.5-pro2"\n  }\n}\r\n\r\n',
    'data: {\n  "response": {\n    "modelVersion": "gemini-2.5-pro3"\n  }\n}\r\n\r\n',
  ];

  // 构造模拟响应流
  const res = new TimedStream(chunks, 1000); // 每 1 秒推送一次
  console.log('log res: ', res);

  // 使用 readline 逐行读取
  const rl = createInterface({
    input: res,
    crlfDelay: Infinity,
  });
  rl.on('line', (line) => {
    console.log('Line:', line);
  });
  rl.on('close', () => {
    console.log('Stream closed.');
  });
}

// 使用 流 读取文件
async function processFileStream() {
  const fileStream = createReadStream('a.txt');
  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  for await (const line of rl) {
    console.log(`Line from file: ${line}`);
  }
}
