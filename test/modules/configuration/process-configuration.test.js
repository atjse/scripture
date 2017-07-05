'use strict'

const tap = require('tap')
const utils = require('../../utils')
const Configuration = require('../../../lib/module/Configuration')

tap.test('_processConfiguration', t => {
  const dir = utils.getFixturesDir('/simple')
  const filePaths = utils.getFixturesFromDir('/simple')
  const config = new Configuration(dir)
  const object = {
    'script-1': 'echo script-1',
    'error-1': 'exit 1'
  }

  filePaths.forEach(filePath => {
    t.deepEqual(config._processConfiguration(filePath), object)
  })

  t.end()
})
