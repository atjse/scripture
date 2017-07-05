'use strict'

const tap = require('tap')
const utils = require('../../utils')
const Configuration = require('../../../lib/module/Configuration')

tap.test('loadConfiguration', t => {
  const dir = utils.getFixturesDir('/simple')
  const filePaths = utils.getFixturesFromDir('/simple')
  const object = {
    'script-1': 'echo script-1',
    'error-1': 'exit 1'
  }

  filePaths.forEach(filePath => {
    const config = new Configuration(dir)

    config.loadConfiguration(utils.filename(filePath))

    t.equal(config.hasConfiguration(), true)
    t.deepEqual(config.getConfiguration(), object)
  })

  t.end()
})
