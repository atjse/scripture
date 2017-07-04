'use strict'

const tap = require('tap')
const Arguments = require('../../lib/module/Arguments')

tap.test('parse invalid', t => {
  const args1 = Arguments.parse()
  const args2 = Arguments.parse(false)
  const args3 = Arguments.parse(true)
  const args4 = Arguments.parse(-1)
  const args5 = Arguments.parse(0)
  const args6 = Arguments.parse(1)
  const args7 = Arguments.parse(NaN)

  t.equal(args1.numArguments(), 2)
  t.equal(args1.hasArguments(), true)

  t.equal(args2.numArguments(), 0)
  t.equal(args2.hasArguments(), false)

  t.equal(args3.numArguments(), 0)
  t.equal(args3.hasArguments(), false)

  t.equal(args4.numArguments(), 0)
  t.equal(args4.hasArguments(), false)

  t.equal(args5.numArguments(), 0)
  t.equal(args5.hasArguments(), false)

  t.equal(args6.numArguments(), 0)
  t.equal(args6.hasArguments(), false)

  t.equal(args7.numArguments(), 0)
  t.equal(args7.hasArguments(), false)

  t.end()
})

tap.test('parse valid', t => {
  const args1 = Arguments.parse('')
  const args2 = Arguments.parse('a')
  const args3 = Arguments.parse('a b c')
  const args4 = Arguments.parse([])
  const args5 = Arguments.parse(['a'])
  const args6 = Arguments.parse(['a', 'b', 'c'])

  t.equal(args1.numArguments(), 0)
  t.equal(args1.hasArguments(), false)

  t.equal(args2.numArguments(), 1)
  t.equal(args2.hasArguments(), true)

  t.equal(args3.numArguments(), 3)
  t.equal(args3.hasArguments(), true)

  t.equal(args4.numArguments(), 0)
  t.equal(args4.hasArguments(), false)

  t.equal(args5.numArguments(), 1)
  t.equal(args5.hasArguments(), true)

  t.equal(args6.numArguments(), 3)
  t.equal(args6.hasArguments(), true)

  t.end()
})
