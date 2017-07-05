'use strict'

const Script = require('./Script')

class Scripts {
  /**
   * @param {Object} object
   */
  constructor (object) {
    /**
     * @private
     * @type {Script[]}
     */
    this._scripts = []

    for (const [key, value] of Object.entries(object)) {
      this._scripts.push(new Script(key, value))
    }
  }

  /**
   * @returns {number}
   */
  numScripts () {
    return this._scripts.length
  }

  /**
   * @returns {boolean}
   */
  hasScripts () {
    return this.numScripts() > 0
  }

  /**
   * @returns {Script[]}
   */
  getScripts () {
    return this._scripts
  }

  /**
   * @param {string} name
   * @returns {boolean}
   */
  hasScript (name) {
    return this.getScript(name) !== null
  }

  /**
   * @param {string} name
   * @returns {Script|null}
   */
  getScript (name) {
    for (const script of this._scripts) {
      if (script.name === name) {
        return script
      }
    }

    return null
  }
}

module.exports = Scripts
