'use strict'

const tap = require('tap')
const Arguments = require('../../lib/module/Arguments')

tap.test('set arguments', t => {
  const args1 = Arguments
    .parse('a b main -f value')
    .option('-f, --flag', 'A flag description.')

  t.notEqual(args1.option.flag, false)
  t.type(args1.option.flag, 'object')
  t.equal(args1.option.flag.value, 'value')
  t.equal(args1.option.flag.description, 'A flag description.')

  t.equal(args1.arguments.length, 1)
  t.equal(args1.arguments[0], 'main')
  t.equal(args1.arguments.main, 'main')

  const args2 = Arguments
    .parse('a b -f value main')
    .option('-f, --flag', 'A flag description.')

  t.notEqual(args2.option.flag, false)
  t.type(args2.option.flag, 'object')
  t.equal(args2.option.flag.value, 'value')
  t.equal(args2.option.flag.description, 'A flag description.')

  t.equal(args2.arguments.length, 1)
  t.equal(args2.arguments[0], 'main')
  t.equal(args2.arguments.main, 'main')

  t.end()
})
