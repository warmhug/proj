// https://github.com/pnpm/pnpm/issues/6667

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
    afterAllResolved,
  },
};
