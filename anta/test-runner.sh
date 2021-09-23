#!/usr/bin/env bash

npm run build && ./node_modules/.bin/mocha --require test/setup.js
