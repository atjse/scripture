'use strict'

const tap = require('tap')
const util = require('../../../lib/module/util')
const Arguments = require('../../../lib/module/Arguments')

tap.test('get help', t => {
  const pkg = require('../../../package')
  const args1 = Arguments
    .package(pkg)
    .usage('scripture [option] script')
    .option('-c, --config', 'Custom configuration file.')
    .option('-h, --help', 'Show help.')
    .option('-v, --version', 'Show version.')

  t.equal(args1.getHelp().split(/\s+/g).join(''), util.denter(`
    ${pkg.name} ${pkg.version}
    ${pkg.license} @ ${pkg.author}
    
    Usage: 
      $ scripture [option] script
    
    Options      
      -c, --config     Custom configuration file.
      -h, --help       Show help.
      -v, --version    Show version.      
  `).split(/\s+/g).join(''))

  t.end()
})
