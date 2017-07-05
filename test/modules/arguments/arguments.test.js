'use strict'

const tap = require('tap')
const Arguments = require('../../../lib/module/Arguments')

tap.test('use cli argument', t => {
  const args1 = Arguments.parse('node script')

  t.equal(args1.arguments.length, 0)
  t.equal(args1.arguments[0], undefined)
  t.equal(args1.arguments.main, undefined)

  const args2 = Arguments.parse('node script main')

  t.equal(args2.arguments.length, 1)
  t.equal(args2.arguments[0], 'main')
  t.equal(args2.arguments.main, 'main')

  t.end()
})
