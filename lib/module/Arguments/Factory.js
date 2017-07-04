'use strict'

class Factory {
  static use (object) {
    return Factory.parse(object)
  }

  static with (object) {
    return Factory.parse(object)
  }

  /**
   * @param {*} object
   */
  static parse (object) {
    return new Factory(object)
  }

  /**
   * @param {Object} object
   */
  constructor (object) {

  }
}

module.exports = Factory
