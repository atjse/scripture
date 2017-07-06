'use strict'

const tap = require('tap')
const sinon = require('sinon')
const sandbox = sinon.createSandbox()

const utils = require('../../utils')
const Runner = require('../../../lib/module/Runner')
const Script = require('../../../lib/module/Scripts/Script')

tap.beforeEach(done => {
  sandbox.replace(Runner, '__process', {
    pid: 1,
    kill: sinon.spy(),
    exit: sinon.spy(),
  })
  done()
})

tap.afterEach(done => {
  sandbox.restore()
  done()
})

tap.test('runner - success with callback', t => {
  const cwd = utils.getFixturesDir()
  const script = new Script('script-1', 'echo script-1')
  const runner = new Runner(cwd)

  runner.run(script, error => {
    setTimeout(() => {
      t.equal(error, false)
      t.end()
    }, 0)
  })
})

tap.test('runner - success without callback', t => {
  const cwd = utils.getFixturesDir()
  const script = new Script('script-1', 'echo script-1')
  const runner = new Runner(cwd)

  try {
    runner.run(script)
  } catch (error) {
    // noop
  }

  t.end()
})

tap.test('runner - error with code', t => {
  const cwd = utils.getFixturesDir()
  const script = new Script('error-1', 'exit 1')
  const runner = new Runner(cwd)

  runner.run(script, error => {
    t.type(error, Error)
    t.equal(error.message, 'Process exited with code: 1')

    setTimeout(() => {
      t.equal(Runner.__process.exit.called, true)
      t.deepEqual(Runner.__process.exit.args[0], [1])
      t.equal(Runner.__process.kill.called, false)
      t.end()
    }, 0)
  })
})

tap.test('runner - error with signal', t => {
  const cwd = utils.getFixturesDir()
  const script = new Script('error-1', 'kill $$')
  const runner = new Runner(cwd)

  runner.run(script, error => {
    t.type(error, Error)
    t.equal(error.message, 'Process exited with signal: SIGTERM')

    setTimeout(() => {
      t.equal(Runner.__process.kill.called, true)
      t.deepEqual(Runner.__process.kill.args[0], [Runner.__process.pid, 'SIGTERM'])
      t.equal(Runner.__process.exit.called, false)
      t.end()
    }, 0)
  })
})

tap.test('runner - error during spawn', t => {
  const cwd = utils.getFixturesDir()
  const script = new Script('error-1', 'echo 0')
  const runner = new Runner(cwd)

  try {
    runner.run(script, () => t.end())
    runner._child.emit('error', new Error('Error during spawning child process'));

  } catch (error) {
    t.type(error, Error)
    t.equal(error.message, 'Error during spawning child process')
  }
})
