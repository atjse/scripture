'use strict'

class Script {
  constructor (name, command) {
    this._name = name
    this._command = command
  }

  getName () {
    return this._name
  }

  getCommand () {
    return this._command
  }
}

module.exports = Script
