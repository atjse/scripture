'use strict'

const tap = require('tap')
const Scripts = require('../../../lib/module/Scripts')
const Script = require('../../../lib/module/Scripts/Script')

tap.test('scripts usage', t => {
  const emptyObject = {}
  const filledObject = {
    'script-1': 'echo script-1',
    'error-1': 'exit 1'
  }
  const script1 = new Script('script-1', filledObject['script-1'])
  const script2 = new Script('error-1', filledObject['error-1'])

  const scripts1 = new Scripts(emptyObject)

  t.equal(scripts1.hasScripts(), false)
  t.equal(scripts1.numScripts(), 0)
  t.deepEqual(scripts1.getScripts(), [])
  t.equal(scripts1.hasScript('script-1'), false)
  t.equal(scripts1.getScript('script-1'), null)

  const scripts2 = new Scripts(filledObject)

  t.equal(scripts2.hasScripts(), true)
  t.equal(scripts2.numScripts(), 2)
  t.deepEqual(scripts2.getScripts(), [
    script1,
    script2
  ])
  t.equal(scripts2.hasScript('script-1'), true)
  t.deepEqual(scripts2.getScript('script-1'), script1)
  t.equal(scripts2.hasScript('error-1'), true)
  t.deepEqual(scripts2.getScript('error-1'), script2)

  t.end()
})
