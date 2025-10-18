import * as readline from 'readline';
import axios from 'axios';

async function main() {
  const res = await axios({
    url: '',
    data: {},
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    responseType: 'stream',
  });

  // 注意: 使用 for of 读取 res.data 的 chunk 会有 读取不到 "换行" 问题
  // for await (const chunk of res.data) {}

  const rl = readline.createInterface({
    input: res.data, // Readable stream
    crlfDelay: Infinity,
  });
}
