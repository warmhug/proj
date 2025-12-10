const fs = require('fs');
const https = require('https');
const { Socket, createServer, createConnection } = require('net');
const Koa = require('koa');
const Router = require('koa-router');
const staticSever = require('koa-static');

const PORT = parseInt(process.env.PORT, 10) || parseInt('26618', 10);

/**

使用 node net 的 createServer 监听 26666 (前端端口) 再使用 const proxy = createConnection 监听 服务端 HTTP(HTTPS) 端口 27666 .
- 当 “浏览器触发了页面重载（Fast Refresh/Full Reload），导致之前的 TCP 连接被强制中断”。 原因是 Next.js 的热更新 (HMR) 连接丢失了（404），或者代码编译导致无法热替换，因此 Next.js 强制浏览器执行 Full Reload（完全刷新页面）。
- 当浏览器执行“完全刷新”时，它会立即取消当前页面上所有未完成的网络请求（包括正在挂起的长轮询或慢速接口）。
这属于开发环境下的正常现象.
https://gemini.google.com/app/3e30bbc235f7a361
2025-12-02
 */

function startHttpServer(server, port) {
  return server.listen(port, () => {
    console.log('> HTTP Ready');
  });
}

function startHttpsServer(server, port) {
  return https
    .createServer(
      {
        key: fs.readFileSync(
          path.join(__dirname, './cert/localhost.testdev.ltd.key')
        ),
        cert: fs.readFileSync(
          path.join(__dirname, './cert/localhost.testdev.ltd.crt')
        ),
      },
      server.callback()
    )
    .listen(port, () => {
      console.log(`> HTTPS Ready`);
    });
}

function isPortAvailable(port) {
  return new Promise((resolve) => {
    const socket = new Socket();
    let available = false;
    socket.setTimeout(5);

    socket.once("connect", () => {
      socket.end();
      socket.destroy();
    });

    socket.once('timeout', () => {
      available = true;
      socket.end();
      socket.destroy();
    });

    socket.once('error', () => {
      available = true;
      socket.end();
      socket.destroy();
    });

    socket.once('close', () => {
      resolve(available);
    });

    socket.connect(port, '127.0.0.1');
  });
}

async function getOnePort(start) {
  let port = start;
  while (!(await isPortAvailable(port))) {
    port += 1;
  }

  return port;
}

function ignoreError(err) {
  // 忽略常见的网络中断错误
  if (err.code === 'EPIPE' || err.code === 'ECONNRESET' || err.code === 'ECANCELED') {
    return true;
  }
  return false;
}

// Start local development server
async function craeteDevServer(server, port) {
  const httpPort = await getOnePort(port + 1000);
  const httpsPort = await getOnePort(httpPort + 1);

  // Start the outer proxy service on the port
  createServer((socket) => {
    socket.once("data", (buf) => {
      /**
       * The first byte of HTTPS is 22
       * Here we decide where to proxy the request based on the protocol
       */
      const protocolPort = buf[0] === 22 ? httpsPort : httpPort;
      const proxy = createConnection(protocolPort, '127.0.0.1', () => {
        proxy.write(buf);
        // 解释: https://chatgpt.com/c/692f105a-3278-8320-9896-bce8721d964e
        socket.pipe(proxy).pipe(socket);
      });

      proxy.on("error", (err) => {
        // console.error("http error1: ", protocolPort, err);
        if (!ignoreError(err)) {
          console.error("http error1 (Target): ", protocolPort, err);
        }
      });
    });

    socket.on("error", (err) => {
      // console.error("http error2: ", err);
      if (!ignoreError(err)) {
        console.error("http error2 (Client): ", err);
      }
    });
  }).listen(port, async () => {
    await startHttpServer(server, httpPort);
    await startHttpsServer(server, httpsPort);

    console.log('> Dev Server Ready');
    console.log(`> https://localhost.xx:${port}/yy/zz`);
    console.log(`> http://localhost.xx:${port}/yy/zz`);
  });
}

function main() {
  const server = new Koa();
  const router = new Router();

  router.get("/api/health/ready", async (ctx) => {
    ctx.body = true;
  });

  router.get('*', async (ctx) => {
    try {
      const parsedUrl = url.parse(ctx.req.url, true);
      // handle(ctx.req, ctx.res, parsedUrl);
    } catch (error) {
      console.log('error in get(*)', error);
    }
    Object.assign(ctx, { respond: false });
  });

  server.use(staticSever('public'));

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
  });
  server.use(router.routes());

  craeteDevServer(server, PORT);
}

main()
