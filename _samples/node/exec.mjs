import { exec, execSync } from 'child_process';
import pkgInfo from './package.json' assert { type: 'json' };

const execa = require('execa');

execa.sync('npm', ['version', 'prerelease', '--preid', 'rc', '--no-git-tag-version']);
execa.sync('cd', ['../../']);

console.log('log pkgsInfo: ', typeof pkgsInfo);

const { stdout, stderr } = execSync(`git status`);
console.log(`manual tag success`);


async function loadModule() {
  const module = await import('./xx.mjs');
  console.log('module: ', module);
}
loadModule();

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
  // 如果输出量非常大，exec 的缓冲区可能会溢出。在这种情况下，child_process.spawn 更适合处理大文件或长输出。
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
    child.stdout.on('data', (data) => {
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
