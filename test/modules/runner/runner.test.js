'use strict'

const tap = require('tap')
const utils = require('../../utils')
const Runner = require('../../../lib/module/Runner')
const Script = require('../../../lib/module/Scripts/Script')

tap.test('runner - success', t => {
  const cwd = utils.getFixturesDir()
  const script = new Script('script-1', 'echo script-1')
  const runner = new Runner(cwd, { debug: true })

  runner.run(script, error => {
    t.equal(error, false)
    t.end()
  })
})

tap.test('runner - error', t => {
  const cwd = utils.getFixturesDir()
  const script = new Script('error-1', 'exit 1')
  const runner = new Runner(cwd, { debug: true })

  runner.run(script, error => {
    t.type(error, Error)
    t.equal(error.message, 'Process exited with code: 1')
    t.end()
  })
})
