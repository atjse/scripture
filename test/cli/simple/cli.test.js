'use strict'

const tap = require('tap')
const utils = require('../../../test/utils')
const Arguments = require('../../../lib/module/Arguments')
const pkg = require('../../../package')

const args = Arguments
  .getDefaultArguments()
  .package(pkg)

const cli = utils.getProjectRootDir('bin/cli.js')
const cwd = utils.getFixturesDir()
const dirSimple = utils.getFixturesDir('/simple')

tap.test('cli without arguments', t => {
  utils.execute('node', `${cli}`)
   .then(data => {
     t.equal(utils.normalizeCliOutput(data), utils.normalizeCliOutput(args.getHelp()))
     t.end()
   })
})

tap.test('cli with --help', t => {
  t.test('--help', t => {
    utils.execute('node', `${cli} --help`)
      .then(data => {
        t.equal(utils.normalizeCliOutput(data), utils.normalizeCliOutput(args.getHelp()))
        t.end()
      })
  })

  t.test('-h', t => {
    utils.execute('node', `${cli} -h`)
      .then(data => {
        t.equal(utils.normalizeCliOutput(data), utils.normalizeCliOutput(args.getHelp()))
        t.end()
      })
  })

  t.end()
})

tap.test('cli with --version', t => {
  t.test('--version', t => {
    utils.execute('node', `${cli} --version`)
    .then(data => {
      t.equal(utils.normalizeCliOutput(data), pkg.version)
      t.end()
    })
  })

  t.test('-v', t => {
    utils.execute('node', `${cli} -v`)
      .then(data => {
        t.equal(utils.normalizeCliOutput(data), pkg.version)
        t.end()
      })
  })

  t.end()
})

tap.test('cli with --config', t => {
  t.test('non-existent', t => {
    utils.execute('node', `${cli} --config non-existent/dir`)
      .catch(error => {
        t.equal(error.message, 'Process exited with code: 1')
        t.equal(utils.outputContains(error.stderr, `Error: Cannot find configuration in 'non-existent/dir'`), true)
        t.end()
      })
  })

  t.test('existent', t=> {
    utils.execute('node', `${cli} --config ${cwd}/simple`)
      .catch(error => {
        t.equal(error.message, 'Process exited with code: 1')
        t.equal(utils.outputContains(error.stderr, 'Error: No NPM script was given'), true)
        t.end()
      })
  })

  t.end()
})

tap.test('cli with npm-script-name', t => {
  t.test('non-existent', t=> {
    utils.execute('node', `${cli} --config ${dirSimple} non-existent-script`)
      .catch(error => {
        t.equal(error.message, 'Process exited with code: 1')
        t.equal(utils.outputContains(error.stderr, `No script was found with the name: 'non-existent-script'`), true)
        t.end()
      })
  })

  t.test('existent without error', t=> {
    utils.execute('node', `${cli} --config ${dirSimple} script-1`)
      .then(stdout => {
        t.equal(utils.normalizeCliOutput(stdout), 'script-1')
        t.end()
      })
  })

  t.test('existent with error', t=> {
    utils.execute('node', `${cli} --config ${dirSimple} error-1`)
      .catch(error => {
        t.equal(error.message, 'Process exited with code: 1')
        t.end()
      })
  })

  t.end()
})
