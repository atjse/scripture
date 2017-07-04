'use strict'

class Script {
  constructor (name, command) {
    this._name = name
    this._command = command
  }

  get name () {
    return this._name
  }

  get command () {
    return this._command
  }
}

module.exports = Script
