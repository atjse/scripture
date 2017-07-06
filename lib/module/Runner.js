'use strict'

const cp = require('child_process')

class Runner {
  /**
   * @param {string} cwd
   * @param {Object} [options]
   */
  constructor (cwd, options) {
    this._cwd = cwd
    this._debug = options && typeof options.debug === 'boolean' ? options.debug : false
  }

  /**
   * @param {Script} script
   * @param {Function} [callback]
   */
  run (script, callback) {
    // assign a noop function if called without a callback
    if (typeof callback !== 'function') {
      callback = function () {}
    }

    const child = cp.spawn('sh', ['-c', script.getCommand()], {
      cwd: this._cwd,
      stdio: 'inherit'
    })

    child
      .on('error', error => {
        throw new Error(error)
      })
      .on('exit', (code, signal) => {
        if (signal) {
          callback(new Error(`Process exited with signal: ${signal}`))
          if (!this._debug) {
            process.kill(process.pid, signal)
          }
        } else if (code) {
          callback(new Error(`Process exited with code: ${code}`))
          if (!this._debug) {
            process.exit(code)
          }
        } else {
          callback(false)
        }
      })
  }
}

module.exports = Runner
