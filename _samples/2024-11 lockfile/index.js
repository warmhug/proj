var path = require("path");

var Arborist = require("@npmcli/arborist");
var pnpmLockfile = require("@pnpm/lockfile-file");
var pnpmLockUtils = require("@pnpm/lockfile-utils");
var yarnLockfile = require("@yarnpkg/lockfile");
var debug = require("debug");
var ini = require("ini");
var escapeStringRegexp = require("escape-string-regexp");
var packageJson = require("package-json");
var psl = require("psl");

var log = debug('fix-lock');
log('aa');

ini.parse(npmrcContent);
var registryDomain = psl.get(new URL(registry).hostname) || '';

path.resolve(process.cwd(), lockfileName);

// Read the hash value of the package in the remote repository
const pkgJson = packageJson('esbuild', { version: '0.21.4' });
console.log('log pkgJson: ', pkgJson.dist);

var arborist = new Arborist({
  path: lockfileDir,
  legacyPeerDeps: true,
});
var lockfile = arborist.loadVirtual();
console.log('log lockfile: ', lockfile.inventory.values());
arborist.reify({ save: true });

regExp = new RegExp(escapeStringRegexp(meta.resolution.integrity), 'g');
lockfileString.replace(regExp, remoteMeta.integrity);

pnpmLockUtils.nameVerFromPkgSnapshot(packagePath, pkgSnapshot);
pnpmLockfile.readWantedLockfile(lockfileDir, { ignoreIncompatible: false });
pnpmLockfile.writeWantedLockfile(lockfileDir, modifiedContent);

content = yarnLockfile.parse(lockFileContent);
yarnLockfile.stringify(modifiedLockfile);
