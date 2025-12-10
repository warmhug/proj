
import http from 'node:http';

const server = http.createServer((req, res) => {
  console.log('Client connected');
  // 故意声明的 Content-Length 比实际发送多
  // res.writeHead(200, { 'Content-Length': 1000, 'Content-Type': 'text/plain' });
  // 故意设置 Transfer-Encoding: chunked（防止 Node 自动关闭）
  res.writeHead(200, { 'Transfer-Encoding': 'chunked' });
  // 发送部分数据
  res.write('partial data....\n');
  // 50ms 后强制关闭 socket -> 模拟 Premature Close
  setTimeout(() => {
    console.log('Simulating premature close...');
    res.socket.destroy(new Error('Server crashed before sending all data'));
  }, 50);
});

server.listen(3000, () => console.log('Server running at http://localhost:3000'));
