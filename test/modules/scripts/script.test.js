'use strict'

const tap = require('tap')
const Script = require('../../../lib/module/Scripts/Script')

tap.test('script usage', t => {
  const script = new Script('script-name', 'script-command')

  t.equal(script.getName(), 'script-name')
  t.equal(script.getCommand(), 'script-command')

  t.end()
})
