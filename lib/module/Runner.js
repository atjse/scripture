'use strict'

const cp = require('child_process')

class Runner {
  /**
   * @param {string} cwd
   */
  constructor (cwd) {
    this._cwd = cwd
    this._callback = function () {}
  }

  /**
   * @param {Script} script
   * @param {Function} [callback]
   */
  run (script, callback) {
    if (typeof callback === 'function') {
      this._callback = callback
    }

    this._child = cp
      .spawn('sh', ['-c', script.getCommand()], {
        cwd: this._cwd,
        stdio: 'inherit'
      })
      .on('error', error => { throw error })
      .on('exit', (code, signal) => this._exit(code, signal))
  }

  _exit (code, signal) {
    if (signal) {
      this._callback(new Error(`Process exited with signal: ${signal}`))
      Runner.__process.kill(Runner.__process.pid, signal)

    } else if (code) {
      this._callback(new Error(`Process exited with code: ${code}`))
      Runner.__process.exit(code)

    } else {
      this._callback(false)
    }
  }
}

Runner.__process = process

module.exports = Runner
