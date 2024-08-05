# _archive

- https://www.npmjs.com/~warmhug
- https://www.npmjs.com/org/huajs
- https://www.npmjs.com/org/warm_hug

## lerna

- https://github.com/lerna/lerna/tree/main/libs/commands/publish
- https://github.com/lerna/lerna/tree/main/libs/commands/version
- https://lerna.js.org/docs/recipes/using-pnpm-with-lerna
- https://pnpm.io/workspaces

```sh
lerna list -l --graph

lerna version patch --exact --message '🎨 chore(release): Publish' --conventional-commits

# 所有子包的版本 不管是不是正式版 都升级为 beta 版
lerna version prerelease --preid beta

lerna publish patch --yes

# from-package 参数会与 npm 包的最新版本号作对比：
# 如果版本号一样(即使包的代码有改变) 则返回 No changed packages to publish
# 如果某一个包的版本号有升级 则只发这个包 不会发依赖它的包
# 所以，可以手动运行 lerna version 发相关所有包
lerna publish from-package --yes
# 以下同时传入 from-package --canary 只有前者生效，参考 lerna publish 代码逻辑
lerna publish from-package --canary --preid beta --dist-tag beta --no-push --no-git-tag-version

# 在 beta 版本里，可以用以下发布命令
lerna publish prerelease --preid beta --dist-tag beta --no-push --no-git-tag-version --yes
# 如下 多了个 canary 则 生成的版本号带有 hash 原因参考 lerna publish 代码逻辑
lerna publish --canary prerelease --preid beta --dist-tag beta
```

### 特殊场景

公司里发布 npm 包，一般通过 “研发流水线+云构建” 的方式进行，比如支持运行 `build.sh` 脚本，在这个脚本里根据 流水线的 test/prod 环境变量，`lerna publish prerelease/patch` 来分别生成 beta或prod 的 npm 包。
但是 为了源代码安全，一般 **不允许流水线直接推代码到 gitlab 仓库里**，所以在 `lerna publish --yes` 时自动生成 Publish commit 信息以及打的 tag 这些内容都不允许在构建脚本里 直接推到 gitlab 里（个人GitHub就没有这个问题）。

lerna有几个生命周期钩子可以利用 `(pre|post)version / prepare / prepack / postpack / postpublish`，
最早和最晚执行的分别是 `preversion | postpublish`。 其中关键的几步：
- 修改和提交代码，是在 postversion 钩子之前执行`gitCommit`([代码](https://github.com/lerna/lerna/blob/main/libs/commands/version/src/index.ts#L881))，之后执行`gitPush`。
- 设置 npm dist-tag 标记，是在 postpublish 钩子之后执行 `npmDistTag`([代码](https://github.com/lerna/lerna/blob/main/libs/commands/publish/src/index.ts#L1089))。

那么参考 lerna 的方式、我们在 正式版代码（beta版可以忽略）流水线脚本运行 `lerna publish` 时，怎么检测是否已经手动给 gitlab 提交了 publish 的 commit 信息以及打好了 tag 呢？
