// https://chatgpt.com/c/67bdd9ea-dad8-8008-8d0e-5beae88b86ac

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// 假设 newVersion 为 lerna bump 后的版本号，可以从参数传入
const newVersion = process.argv[2];
if (!newVersion) {
  console.error('请传入新的版本号，例如：node update-alias.js 1.2.3');
  process.exit(1);
}

// 根据项目结构匹配所有 package.json 文件
glob('packages/*/package.json', (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    const pkgPath = path.resolve(file);
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    let modified = false;

    // 处理 dependencies 和 devDependencies 中的 npm alias 依赖
    ['dependencies', 'devDependencies'].forEach(depType => {
      const deps = pkg[depType];
      if (deps) {
        Object.keys(deps).forEach(depName => {
          const value = deps[depName];
          // 匹配 npm alias 格式，例如 "npm:real-package@1.0.0"
          const aliasMatch = /^npm:(.+)@(.+)$/.exec(value);
          if (aliasMatch) {
            const realPkgName = aliasMatch[1];
            // 更新版本号为 newVersion，可以根据需求调整前缀（例如 ^ 或 ~）
            deps[depName] = `npm:${realPkgName}@${newVersion}`;
            modified = true;
          }
        });
      }
    });

    if (modified) {
      fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
      console.log(`更新了 ${pkg.name} 中的 npm alias 依赖版本号`);
    }
  });
});
