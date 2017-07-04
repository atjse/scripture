'use strict'

const tap = require('tap')
const Arguments = require('../../lib/module/Arguments')

tap.test('set package', t => {
  const pkg = require('../../package')
  const args1 = Arguments.package(require('../../package'))

  t.equal(args1.getHeader(), `${pkg.name} ${pkg.version}\n${pkg.license} @ ${pkg.author}`)

  t.end()
})
