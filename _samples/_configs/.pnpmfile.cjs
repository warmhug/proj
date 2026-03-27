// https://github.com/pnpm/pnpm/issues/6667

function readPackage(pkg, context) {
  if (pkg.name === 'ajv') {
    // pkg.scripts = pkg.scripts || {};

    // docs: https://github.com/uhop/install-artifact-from-github/wiki/Install-from-cache
    //
    // If has new version in github, it will auto bump, this is not good.
    // https://github.com/uhop/node-re2/releases
    // https://github.com/uhop/node-re2/releases/download/1.20.12/darwin-x64-108.br
    //
    // inner proxy (directly download github resources):
    // https://pkg.xx.team/generic/xx/generic-external/github.com/uhop/node-re2/releases/download/1.20.12/linux-x64-108.br
    // https://pkg.kua.team/generic/kua/maven-raw-bazel-public/uhop/node-re2/releases/download/1.21.4/linux-x64-108.br
    // https://maven.xx.team/repository/bazel-public/uhop/node-re2/releases/download/1.21.5/linux-x64-108.br

    // "local-file or localhost" serve linux-x64-108.br, also not work.
    // process.env.RE2_DOWNLOAD_MIRROR = 'https://local.mirror'; // or .
    // process.env.RE2_DOWNLOAD_SKIP_PATH = '1';
    // process.env.RE2_DOWNLOAD_SKIP_VER = '1';

    // does not work in .npmrc file
    // RE2_DOWNLOAD_MIRROR=https://pkg.xx.team/generic/xx/generic-external/github.com

    // In ./ajv/package.json -> devDependencies
    // set "re2": "1.20.12", fix version, is important !!!!
    console.log('log RE2 env before: ', process.env.RE2_DOWNLOAD_MIRROR);
    // process.env.RE2_DOWNLOAD_MIRROR = 'https://pkg.xx.team/generic/xx/generic-external/github.com';
  }

  return pkg
}

// 删除 lockfile 能执行
function afterAllResolved(lockfile, context) {
  console.log('log context: ', context);
  console.log('log lockfile afterAllResolved ?');
  // Remove the tarball URLs from the lockfile
  for (const key in lockfile.packages) {
    console.log('log key: ', key);
    if (lockfile.packages[key].resolution?.tarball) {
      delete lockfile.packages[key].resolution.tarball;
    }
  }
  return lockfile;
}

module.exports = {
  hooks: {
    readPackage,
    afterAllResolved,
  },
};
