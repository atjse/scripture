'use strict'

const tap = require('tap')
const utils = require('../../utils')
const Configuration = require('../../../lib/module/Configuration')

tap.test('_findConfiguration', t => {
  const dir = utils.getFixturesDir('/simple')
  const config = new Configuration(dir)
  const files = Configuration.FILE_LIST

  // existing files
  files.forEach(file => {
    t.equal(config._findConfiguration([file]), utils.normalize(dir, file))
  })

  // non-existing files
  files.forEach(file => {
    t.equal(config._findConfiguration(['___' + file]), null)
  })

  t.end()
})
