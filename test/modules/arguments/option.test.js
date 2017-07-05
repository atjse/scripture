'use strict'

const tap = require('tap')
const Option = require('../../../lib/module/Arguments/Option')

tap.test('invalid initialization', t => {
  t.throws(() => new Option(),
    new TypeError('Option flags must be a non-empty string or non-empty string array, got: "undefined"'))

  t.throws(() => new Option(''),
    new TypeError('Option flags must be a non-empty string or non-empty string array, got: "empty string"'))

  t.throws(() => new Option('   '),
    new TypeError('Option flags must be a non-empty string or non-empty string array, got: "empty string"'))

  t.throws(() => new Option([]),
    new TypeError('Option flags must be a non-empty string or non-empty string array, got: "empty array"'))

  t.throws(() => new Option(['']),
    new TypeError('Invalid Option flags, must be a non-empty string or non-empty string array, got: "[""]"'))

  t.throws(() => new Option(['', '', '']),
    new TypeError('Invalid Option flags, must be a non-empty string or non-empty string array, got: "["","",""]"'))

  t.end()
})

tap.test('initialization with one flag', t => {
  const option1 = new Option('-flag')

  t.equal(option1.numFlags(), 1)
  t.equal(option1.hasFlag('-flag'), true)
  t.equal(option1.hasFlag(['-flag']), true)
  t.deepEqual(option1.getFlags(), ['-flag'])

  const option2 = new Option(['-flag'])

  t.equal(option2.numFlags(), 1)
  t.equal(option2.hasFlag('-flag'), true)
  t.equal(option2.hasFlag(['-flag']), true)
  t.deepEqual(option2.getFlags(), ['-flag'])

  t.end()
})

tap.test('initialization with multiple flags', t => {
  const option1 = new Option('-f, -flag')

  t.equal(option1.numFlags(), 2)
  t.equal(option1.hasFlag('-f'), true)
  t.equal(option1.hasFlag(['-f']), true)
  t.equal(option1.hasFlag('-flag'), true)
  t.equal(option1.hasFlag(['-flag']), true)
  t.deepEqual(option1.getFlags(), ['-f', '-flag'])

  const option2 = new Option('-f -flag')

  t.equal(option2.numFlags(), 2)
  t.equal(option2.hasFlag('-f'), true)
  t.equal(option2.hasFlag(['-f']), true)
  t.equal(option2.hasFlag('-flag'), true)
  t.equal(option2.hasFlag(['-flag']), true)
  t.deepEqual(option2.getFlags(), ['-f', '-flag'])

  const option3 = new Option(['-f', '-flag'])

  t.equal(option3.numFlags(), 2)
  t.equal(option3.hasFlag('-f'), true)
  t.equal(option3.hasFlag(['-f']), true)
  t.equal(option3.hasFlag('-flag'), true)
  t.equal(option3.hasFlag(['-flag']), true)
  t.deepEqual(option3.getFlags(), ['-f', '-flag'])

  t.end()
})

tap.test('initialization with flags and description', t => {
  const option1 = new Option('-f, -flag', '')

  t.equal(option1.hasDescription(), false)
  t.equal(option1.getDescription(), '')

  const option2 = new Option('-f, -flag', 'The description.')

  t.equal(option2.hasDescription(), true)
  t.equal(option2.getDescription(), 'The description.')

  t.end()
})

tap.test('inspect value', t => {
  const option1 = new Option('-f, -flag', 'The description.')

  t.equal(option1.hasValue(), false)
  t.equal(option1.getValue(), '')

  const option2 = new Option('-f, -flag', 'The description.')

  option2._setValue('value')

  t.equal(option2.hasValue(), true)
  t.equal(option2.getValue(), 'value')

  t.end()
})
