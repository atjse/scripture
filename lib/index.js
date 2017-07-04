'use strict'

const Arguments = require('./module/Arguments/Arguments')
const Configuration = require('./module/Configuration')
const Script = require('./module/Script')
const Scripts = require('./module/Scripts')
const Runner = require('./module/Runner')

const args = new Arguments(process.argv)
const config = new Configuration(process.cwd())

// console.log(args);
// console.log(config);

;(async () => {
  await config.loadConfiguration();
  const configList = config.getConfiguration()
  const scripts = new Scripts(configList)
  const runner = new Runner(process.cwd())

  if (args.hasArguments()) {
    const main = args.getMainArgument()

    if (scripts.hasScript(main)) {
      console.log(scripts.getScript(main))
      runner.run(scripts.getScript(main))
    } else {
      console.log('no script with name:', main)
    }
  }
})()
