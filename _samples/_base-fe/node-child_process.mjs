import { exec, execSync, spawn } from 'child_process';

// 当需要在命令中使用重定向 (>>, 2>&1 等) 或管道 (|)，必须通过一个 shell 来解释这些元字符，否则它们会被当作子进程的参数，而不是由 shell 处理.
// Variant A: 明确调用 Bash，并用 -c 参数告诉它执行后面的整条命令
const childA = spawn(
  'bash',
  ['-c', 'ls >> a.txt'],
  { stdio: 'inherit' }
);
childA.on('exit', (code) => {
  console.log(`Variant A exited with code ${code}`);
});
// Variant B: 设置 shell: true 让 Node.js 在后台自动用 /bin/sh（或 Windows 上的 cmd.exe）来执行命令
const childB = spawn(
  'ls >> a.txt',
  { shell: true, stdio: 'inherit' }
);
childB.on('exit', (code) => {
  console.log(`Variant B exited with code ${code}`);
});

const result = execSync(`git status`);
console.log('log result: ', result);

const asyncExec = () => {
  // 注意，不支持 await child_process.exec
  return new Promise((resolve, reject) => {
    child_process.exec(
      // `git name-rev --name-only HEAD`,
      'git log --pretty=format:"%h - %an - %s" -n 5',
      { encoding: 'utf-8' },
      (error, stdout, stderr) => {
        console.log('exec stdout: ', error, stdout, stderr);
        error ? reject(error) : resolve(stdout)
      }
    );
  });
};

const asyncSpawn = () => {
  // child_process.spawn 更适合处理大文件或长输出, 使用 exec 的缓冲区可能会溢出
  return new Promise((resolve, reject) => {
    const child = child_process.spawn(
      // 使用字符串会报错
      // 'git log --pretty=format:"%h - %an - %s" -n 5',
      // 出错提示 Your git status is not clean. Aborting.
      // 'git', ['status', '--porcelain'],
      'git', ['log', '--pretty=format:"%h - %an - %s"'],
      { encoding: 'utf-8' },
    );
    // console.log('child: ', child);
    child.stdout?.on('data', (data) => {
      console.log('data: ', data.toString());
      resolve();
      // 处理标准输出并将其转换为字符串
      // process.stdout.write(data.toString());
    });
    child.once('error', (err) => {
      console.log('err: ', err);
      reject(err);
    });
    // child.on('close', (code) => {
    child.once('close', (code) => {
      console.log('close: ', code);
    });
  });
};
await asyncExec();
await asyncSpawn();
