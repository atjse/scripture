#!/usr/bin/env node

'use strict'

/*
const cp = require('child_process')
const spawn = cp.spawn

const cwd = process.cwd()

//console.log(process.env);
console.log(process.argv);

// spawn('npm', ['list', '--json'], {stdio: 'inherit'})
// spawn('node_modules/.bin/standard', [], {stdio: 'inherit'})
// spawn('node_modules/.bin/standard', ['--verbose'], {stdio: 'inherit'})
const child = spawn('sh', ['-c', 'standard --verbose | snazzy'], {
// const child = spawn('sh', ['-c', 'nodemon src/cli.js'], {
// const child = spawn('sh', ['-c', 'node test/error-1.js'], {
  cwd: cwd,
  stdio: 'inherit'
})

// console.log(child.stdout);
// console.log(child.stderr);
// child.stdout.on('data', data => console.log(data.toString()))
// child.stderr.on('data', data => console.log(data.toString()))


//process.on('uncaughtException', function (exception) {
  // handle or ignore error
  //throw exception
  //process.exit(1)
//});


child
  .on('error', error => {
    throw new Error(error)
  })
  .on('exit', (code, signal) => {
    if (signal) {
      process.kill(process.pid, signal)
    } else if (code) {
      process.exit(code)
    }
  })
*/

/**
 * @param {Scripts} scripts
 */
function printAvailableScripts(scripts) {
  const indent = '  '
  let list = ''

  for (const script of scripts.getScripts()) {
    list += indent + script.name + '\n' + indent + indent + script.command + '\n'
  }

  list = list.substr(0, list.length-1)

  console.log('Available scripts:')
  console.log(list)

  process.exit()
}

const Arguments = require('../lib/module/Arguments/Arguments')
const Configuration = require('../lib/module/Configuration')
const Scripts = require('../lib/module/Scripts')
const Runner = require('../lib/module/Runner')

const cwd = process.cwd()
const args = new Arguments(process.argv, [
  ['-c', '--config']
])
const config = new Configuration(cwd)

console.log(process.argv)

;(async () => {
  await config.loadConfiguration();
  const scripts = new Scripts(config.getConfiguration())

  if (!args.hasArguments()) {
    printAvailableScripts(scripts)
  }

  const main = args.getMainArgument()

  if (!scripts.hasScript(main)) {
    console.error(`missing script: ${main}`)
    process.exit(1)
  }

  const runner = new Runner(cwd)
  runner.run(scripts.getScript(main))
})()
