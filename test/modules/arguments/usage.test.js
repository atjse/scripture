'use strict'

const tap = require('tap')
const Arguments = require('../../../lib/module/Arguments')

tap.test('set usage', t => {
  const args1 = Arguments.usage('scripture [options] script')

  t.equal(args1.getUsage(), 'scripture [options] script')

  t.end()
})
