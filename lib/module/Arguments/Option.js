'use strict'

const util = require('../util')

const TYPE_UNARY = 'unary'

const TYPE_BINARY = 'binary'

class Option {
  /**
   * @param {string|string[]} flags
   * @param {string}          [description]
   */
  constructor (flags, description) {
    if (!util.isStringOrStringArray(flags) || util.isEmpty(flags)) {
      throw new TypeError(`Option flags must be a non-empty string or non-empty string array, got: "${util.typeForError(flags)}"`)
    }

    const processedFlags = this._processFlags(flags)

    if (processedFlags === null) {
      throw new TypeError(`Invalid Option flags, must be a non-empty string or non-empty string array, got: "${util.dumpForError(flags)}"`)
    }

    this._setFlags(processedFlags)
    this._setDescription(description)

    let type = TYPE_BINARY

    for (const flag of this.getFlags()) {
      switch (flag) {
        case '-h':
        case '--help':
        case '-v':
        case '--version':
          type = TYPE_UNARY
          break
      }
    }

    this._setType(type)

    /**
     * @private
     * @type {string|null}
     */
    this._value = null
  }

  get description () {
    return this.getDescription()
  }

  get value () {
    return this.getValue()
  }

  /**
   * @param {string|string[]|*} flags
   * @returns {boolean}
   */
  hasFlag (flags) {
    flags = this._processFlags(flags)

    if (!flags) {
      return false
    }

    for (const flag of flags) {
      if (this._flags.indexOf(flag) > -1) {
        return true
      }
    }

    return false
  }

  /**
   * @returns {number}
   */
  numFlags () {
    return this.getFlags().length
  }

  /**
   * @returns {string[]}
   */
  getFlags () {
    return this._flags
  }

  /**
   * @returns {boolean}
   */
  hasDescription () {
    return this._description !== null
  }

  /**
   * @returns {string}
   */
  getDescription () {
    if (!this.hasDescription()) {
      return ''
    }

    return this._description
  }

  /**
   * @returns {boolean}
   */
  hasValue () {
    return this._value !== null
  }

  /**
   * @returns {string}
   */
  getValue () {
    if (!this.hasValue()) {
      return ''
    }

    return this._value
  }

  /**
   * @returns {boolean}
   */
  isSet () {
    return !!this._set
  }

  /**
   * @private
   * @param {string[]} flags
   */
  _setFlags (flags) {
    this._flags = flags
  }

  /**
   * @private
   * @param {string|*} description
   */
  _setDescription (description) {
    /**
     * @private
     * @type {string|null}
     */
    this._description = null

    if (typeof description === 'string') {
      description = description.trim()

      if (description.length > 0) {
        this._description = description
      }
    }
  }

  _getType () {
    return this._type
  }

  _setType (type) {
    this._type = type
  }

  /**
   * @protected
   * @param {*} value
   */
  _setValue (value) {
    this._value = value
    this._set = true
  }

  /**
   * @protected
   * @returns {Object|boolean}
   */
  _getter () {
    if (!this.isSet()) {
      return false
    }

    return {
      description: this.description,
      value: this.value
    }
  }

  /**
   * @private
   * @param {string|string[]|*} flags
   * @returns {string[]|null}
   */
  _processFlags (flags) {
    if (typeof  flags === 'string') {
      flags = flags.trim()
      flags = flags.split(/[\s,]+/g)
    }

    if (!Array.isArray(flags)) {
      return null
    }

    if (flags.length === 0) {
      return null
    }

    const flagList = []

    flags.forEach(flag => {
      if (typeof flag === 'string') {
        flag = flag.trim()

        if (flag.length > 0) {
          flagList.push(flag)
        }
      }
    })

    if (flagList.length === 0) {
      return null
    }

    return flagList
  }

  /**
   * @protected
   * @param {string[]} args
   */
  _processArgs (args) {
    for (const flag of this.getFlags()) {
      const index = args.indexOf(flag)

      if (index > -1) {
        let value
        let remove

        switch (this._getType()) {
          case TYPE_UNARY:
            value = true
            remove = 1
            break

          case TYPE_BINARY:
            value = args.slice(index + 1, args.length)[0]
            remove = 2
            break
        }

        // get the value of the flag from the arguments
        this._setValue(value)

        // delete the flag and the value/values in the arguments
        args.splice(index, remove)
        break
      }
    }
  }
}

module.exports = Option
