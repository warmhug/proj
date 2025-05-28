#!/usr/bin/env node
const fs = require('fs');
import _ from 'lodash';
import chalk from 'chalk';
const execa = require('execa');
const YAML = require('yaml');
// const { chrome } = require('@rookie-rs/api');
import { chrome, brave } from "@rookie-rs/api";

console.error(chalk.blue(message));

function lodashMerge() {
  const obj1 = {
    a: { b: 1, c: [1, 2] },
    d: { e: 'foo' }
  };
  const obj2 = {
    a: { b: 2, c: [3] },
    d: { f: 'bar' }
  };
  var result = _.merge({}, obj1, obj2);
  console.log('log result: ', result);
  function customizer(objValue, srcValue) {
    if (_.isArray(objValue)) {
      return srcValue;
    }
  }
  var result = _.mergeWith({}, obj1, obj2, customizer);
  console.log('log result: ', result);
}

function rookie() {
  // const cookies = brave();
  console.log('log brave: ', brave);
  console.log('log chrome: ', chrome);
  const cookies = chrome();
  for (const cookie of cookies) {
    console.log(cookie);
  }
}

function execaFn() {
  execa.sync('npm', ['version', 'prerelease', '--preid', 'rc', '--no-git-tag-version']);
  execa.sync('cd', ['../../']);
}

function yamlFn() {
  const filePath = process.argv[2] || 'pnpm-lock.yaml';
  // 1. 读取原文件内容
  const file = fs.readFileSync(filePath, 'utf8');
  // 2. 解析为 Document，保留 CST 节点和节点类型（以保留注释、空行、锚点等）
  const doc = YAML.parseDocument(file, {
    keepCstNodes: true,
    keepNodeTypes: true
  }); // :contentReference[oaicite:3]{index=3}
  // 3. 获取顶层的 'packages' 映射
  const pkgs = doc.get('packages', /* asNode */ true);
  if (pkgs && pkgs.items) {
    for (const pkg of pkgs.items) {
      // pkg.value 是每个包的映射节点
      const details = pkg.value;
      // 查找并删除其 resolution.tarball 字段
      const resolution = details.get('resolution', /* asNode */ true);
      if (resolution && resolution.delete) {
        resolution.delete('tarball');
      }
    }
  }
  // 4. 序列化并写回原文件
  fs.writeFileSync(filePath, String(doc), 'utf8');
  console.log(`✅ 已移除所有 resolution.tarball 字段：${filePath}`);
}
