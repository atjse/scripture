'use strict'

const tap = require('tap')
const Arguments = require('../../../lib/module/Arguments')

tap.test('use cli argument', t => {
  const args1 = Arguments.parse('node script')

  t.equal(args1.arguments.length, 0)
  t.equal(args1.arguments[0], undefined)
  t.equal(args1.arguments.main, undefined)
  t.equal(args1.hasArgument('main'), false)

  const args2 = Arguments.parse('node script main')

  t.equal(args2.arguments.length, 1)
  t.equal(args2.arguments[0], 'main')
  t.equal(args2.arguments.main, 'main')
  t.equal(args2.hasArgument('main'), true)

  const args3 = Arguments
    .parse('/home/user/.nvm/versions/node/v9.5.0/bin/node /home/user/projects/scripts/bin/cli.js -c file script-name')

  t.equal(args3.arguments.length, 3)
  t.equal(args3.arguments[0], '-c')
  t.equal(args3.arguments[1], 'file')
  t.equal(args3.arguments[2], 'script-name')
  t.equal(args3.hasArgument('-c'), true)
  t.equal(args3.hasArgument('file'), true)
  t.equal(args3.hasArgument('script-name'), true)

  const args4 = Arguments.parse([
    '/home/user/.nvm/versions/node/v9.5.0/bin/node',
    '/home/user/projects/scripts/bin/cli.js',
    '--config dir/file.json',
    'script-name'
  ])

  t.equal(args4.arguments.length, 3)
  t.equal(args4.arguments[0], '--config')
  t.equal(args4.arguments[1], 'dir/file.json')
  t.equal(args4.arguments[2], 'script-name')
  t.equal(args4.hasArgument('--config'), true)
  t.equal(args4.hasArgument('dir/file.json'), true)
  t.equal(args4.hasArgument('script-name'), true)

  t.end()
})
