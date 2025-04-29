// import lerna from 'lerna';
// import lernaCli from 'lerna/cli';
import lernaChanged from 'lerna/commands/changed';
import { ChangedCommand } from 'lerna/commands/changed';

// console.log('log lerna: ', lerna);
// console.log('log lernaCli: ', lernaCli);
console.log('log lernaChanged: ', lernaChanged, ChangedCommand);

async function listChangedPackages() {
  const changedCommand = new ChangedCommand(['--json'], {
    cwd: process.cwd(),
  });
  try {
    await changedCommand.run();
  } catch (error) {
    console.error('Failed to list changed packages:', error);
  }
}

listChangedPackages();

class CustomChangedCommand extends ChangedCommand {
  // 覆盖包收集逻辑
  collectPackages() {
    // 调用父类方法获取原始变更包列表
    const originalPackages = super.collectPackages();

    // 自定义过滤逻辑（示例：排除合并提交影响的包）
    const filteredPackages = originalPackages.filter(pkg => {
      const commits = this.getCommitMessagesForPackage(pkg);
      return !commits.some(msg => msg.startsWith("Merge branch"));
    });

    return filteredPackages;
  }

  // 辅助方法：获取包关联的提交消息
  getCommitMessagesForPackage(pkg) {
    // 实现获取提交消息的逻辑（可能需要调用 Git）
    // 示例伪代码：
    return ["feat: add new feature", "Merge branch 'dev'"];
  }
}
