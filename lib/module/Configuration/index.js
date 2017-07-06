'use strict'

const p = require('path')
const fs = require('fs')
const yaml = require('js-yaml')

const TYPE_JSON = 'json'
const TYPE_YAML = 'yml'
const TYPE_JAVASCRIPT = 'js'

/**
 * @const {string[]}
 */
const FILE_LIST = [
  '.scriptsrc',
  '.scriptrc',
  '.scriptsrc.json',
  '.scriptrc.json',
  '.scriptsrc.yml',
  '.scriptrc.yml',
  '.scripts.yml',
  '.script.yml',
  '.scriptsrc.js',
  '.scriptrc.js',
]

class Configuration {
  /**
   * @param {string} cwd
   */
  constructor (cwd) {
    if (typeof cwd !== 'string') {
      throw new Error(`The cwd parameter must be a string, got: "${typeof cwd}"`)
    }

    this._processCwd(cwd)
  }

  /**
   * @param {string|string[]} fileList
   */
  loadConfiguration (fileList = FILE_LIST) {
    if (!Array.isArray(fileList)) {
      fileList = [fileList]
    }

    // TODO: {string|string[]} parameter error handling

    const path = this._findConfiguration(fileList)

    let config = null

    if (path) {
      config = this._processConfiguration(path)
    }

    this._config = config
  }

  /**
   * @returns {boolean}
   */
  hasConfiguration () {
    return this._config !== null
  }

  /**
   * @returns {Object}
   */
  getConfiguration () {
    if (!this.hasConfiguration()) {
      return {}
    }

    return this._config
  }

  /**
   * @private
   * @param {string} cwd
   */
  _processCwd (cwd) {
    this._cwd = p.normalize(cwd)
  }

  /**
   *
   * @private
   * @param {string[]} fileList
   *
   * @returns {string|null}
   */
  _findConfiguration (fileList) {
    for (const file of fileList) {
      const cwd = this._cwd
      const path = p.normalize(`${cwd}/${file}`)
      const exists = fs.existsSync(path)

      if (exists) {
        return path
      }
    }

    return null
  }

  /**
   * @private
   * @param {string} path
   * @returns {Object}
   */
  _processConfiguration (path) {
    const ext = p.extname(path).toLowerCase().substr(1)
    const buffer = fs.readFileSync(path)
    const content = buffer.toString()

    let object = {}

    switch (ext) {
      case '':
      case TYPE_JSON:
        try {
          object = JSON.parse(content)
        } catch (error) {
          // noop
        }
        break

      case TYPE_JAVASCRIPT:
        object = require(path)
        break

      case TYPE_YAML:
        try {
          object = yaml.safeLoad(content)
        } catch (error) {
          // noop
        }
        break
    }

    return object
  }
}

/**
 * @const {string[]}
 */
Configuration.FILE_LIST = FILE_LIST

module.exports = Configuration
