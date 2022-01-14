// Copyright 2016 Google Inc. All Rights Reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE

import * as path from 'path';
import * as fs from 'fs';

function getConfigFromFile(fileName: string = 'package.json') {
  let resolved: string;
  try {
    resolved = require.resolve(`./${fileName}`);
  } catch (e) {
    const cwdPath = path.resolve(process.cwd(), fileName);
    resolved = require.resolve(cwdPath);
  }
  const config = require(resolved);
  if(config !== null && typeof config === 'object') {
    if (resolved.endsWith('package.json'))
      return config.anta || {};
    else return config;
  } else throw new Error(`Invalid config from ${fileName}`);
}

const writeToDisk = function(fileName: string, data: any) {
  return new Promise((resolve, reject) => {
    const pa = path.join(process.cwd(), fileName);
    try {
      fs.writeFileSync(pa, data);
      resolve();
    } catch {
      console.error('write to disk error');
    }
    // fs.writeFile(pa, data, err => {
    //   if (err) reject(err);
    //   console.log('SUCCESS', 'SAVED_TO_JSON', pa);
    //   resolve();
    // });
  });
};

module.exports = { getConfigFromFile, writeToDisk };
