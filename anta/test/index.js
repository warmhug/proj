'use strict';

// const testUtils = require('@alipay/techless-function').testUtils;
// const assert = require('assert');

const PWMetrics = require('../lib');
const runOptions = require('./fixtures/run-options');
const dataMocks = require('./fixtures/mocks');

describe('test/index.test.js', () => {
  it('should run', async () => {
    // const res = await testUtils.run(process.cwd(), { a: 1 });
    // assert(res.status === 'SUCCESS');
    // assert.deepEqual(res.result, { a: 1 });
  });
});

/* eslint-env mocha */
describe('PWMetrics', () => {
  describe('public variables', () => {
    it('should set class variables', () => {
      const pwMetrics = new PWMetrics(runOptions.publicVariables.url, runOptions.publicVariables.opts);

      expect(pwMetrics.url).to.be.equal(runOptions.publicVariables.url);
      expect(pwMetrics.runs).to.be.equal(1);
    });

    it('should set more then one run', () => {
      const opts = Object.assign({}, runOptions.publicVariables.opts);
      opts.flags = {};
      opts.flags.runs = 2;
      const pwMetrics = new PWMetrics(runOptions.publicVariables.url, opts);
      expect(pwMetrics.runs).to.be.equal(2);
    });

    describe('expectations', () => {
      it('should set expectations', () => {
        const pwMetrics = new PWMetrics(runOptions.publicVariables.url, runOptions.publicVariablesWithExpectations.opts);
        expect(pwMetrics.expectations).to.be.equal(runOptions.publicVariablesWithExpectations.opts.expectations);
      });
    });
  });
});
