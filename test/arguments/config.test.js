'use strict'

const tap = require('tap')
const Arguments = require('../../lib/module/Arguments')

tap.test('set config flag', t => {
  const args1 = Arguments
    .parse('node script -c file')
    .option('-c, --config', 'Custom configuration file.')

  t.notEqual(args1.option.config, false)
  t.type(args1.option.config, 'object')
  t.equal(args1.option.config.value, 'file')
  t.equal(args1.option.config.description, 'Custom configuration file.')

  const args2 = Arguments
    .parse('node script -c custom/file.js')
    .option('-c, --config', 'Another custom configuration file.')

  t.notEqual(args2.option.config, false)
  t.type(args2.option.config, 'object')
  t.equal(args2.option.config.value, 'custom/file.js')
  t.equal(args2.option.config.description, 'Another custom configuration file.')

  const args3 = Arguments
    .parse('node script -c ./scripts/index.js')
    .option('-c, --config', 'Third custom configuration file.')

  t.notEqual(args3.option.config, false)
  t.type(args3.option.config, 'object')
  t.equal(args3.option.config.value, './scripts/index.js')
  t.equal(args3.option.config.description, 'Third custom configuration file.')

  t.end()
})
