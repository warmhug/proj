// 2024 https://github.com/npm/node-semver 使用

// const semver = require('semver');
import semver from 'semver';

await test();
async function test() {
  const testVersions = [
    // '0.9.8', '0.9.9', '0.9.10',
    '0.9.10-beta', '0.9.0-beta', '0.9.0-beta.1',
    // '0.9.9-beta', '0.9.9-beta.1',
    // '0.9.9-alpha.2', '0.9.9-alpha.3', '0.9.9-rc',
  ];
  console.log(
    'filter versions',
    testVersions.filter(v => semver.gte(v, '0.9.0-beta')),
    testVersions.filter(v => semver.satisfies(v, '>=0.9')),
    testVersions.filter(v => semver.satisfies(v, '>=0.9.0-beta')),
  );

  const gtMinors = testVersions.filter(v => semver.gte(v, '0.9.0-beta.4') && v.startsWith('0.9'));
  console.log('gtMinors: ', gtMinors);
  console.log('semver.maxSatisfying: ', semver.maxSatisfying(testVersions, '0.9.*'));
  console.log('semver.maxSatisfying: ', semver.maxSatisfying(testVersions, '0.9.*', { includePrerelease: true }));
  console.log('semver.maxSatisfying: ', semver.maxSatisfying(testVersions, '0.10.*'));
  console.log('semver.maxSatisfying: ', semver.maxSatisfying(testVersions, '0.10.*', { includePrerelease: true }));

  console.log('sort: ', semver.sort(testVersions));

  console.log('prerelease: ', semver.prerelease('1.2.3'));
  console.log('prerelease: ', semver.prerelease('1.2.3-beta.1'));

  console.log('major: ', semver.inc('1.2.3-beta.1', 'major'));
  console.log('minor: ', semver.inc('1.2.3-beta.1', 'minor'));
  console.log('patch: ', semver.inc('1.2.3-beta.1', 'patch'));

  // premajor 默认的预发布号 -0 结果为 2.0.0-0
  console.log('premajor: ', semver.inc('1.2.3-beta.1', 'premajor'));
  console.log('premajor: ', semver.inc('1.2.3-beta.1', 'premajor', 'rc', '0'));
  console.log('premajor: ', semver.inc('1.2.3-beta.1', 'premajor', 'rc', '1'));
  console.log('premajor: ', semver.inc('1.2.3-beta.1', 'premajor', 'rc', '3'));
  console.log('preminor: ', semver.inc('1.2.3-beta.1', 'preminor'));
  console.log('prepatch: ', semver.inc('1.2.3-beta.1', 'prepatch'));

  console.log('prerelease', semver.inc('1.2.3', 'prerelease', 'beta'));
  console.log('prerelease beta: ', semver.inc('1.2.3-beta', 'prerelease', 'beta'));
  console.log('prerelease alpha: ', semver.inc('1.2.3-beta', 'prerelease', 'alpha'));
  console.log('prerelease beta0: ', semver.inc('1.2.3-beta.0', 'prerelease', 'beta'));
  console.log('prerelease alpha: ', semver.inc('1.2.3-beta.0', 'prerelease', 'alpha'));
  console.log('major: ', semver.major('1.2.3-beta.0'));
  console.log('minor: ', semver.minor('1.2.3-beta.0'));
  console.log('semver.valid', semver.valid('1.2.3-beta.20+aseds'));
  console.log('semver.parse build: ', semver.parse('1.2.3-beta.20+aseds'));
  console.log('semver.parse build: ', semver.parse('1.2.3+xxbuild'));
  console.log('semver.parse build inc: ', semver.inc('1.2.3+xxbuild', 'patch'));
  console.log('semver.parse build inc: ', semver.inc('1.2.3-beta+xxbuild', 'patch'));
  console.log('semver.parse canary build inc: ', semver.inc('1.2.3-canary.20240924.1', 'patch'));
}
