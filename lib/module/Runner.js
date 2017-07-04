'use strict'

const cp = require('child_process')
const Script = require('./Script')

class Runner {
  /**
   * @param {string} cwd
   */
  constructor (cwd) {
    this._cwd = cwd
  }

  /**
   * @param {Script} script
   */
  run (script) {
    const child = cp.spawn('sh', ['-c', script.command], {
      cwd: this._cwd,
      stdio: 'inherit'
    })

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
  }
}

module.exports = Runner
