'use strict'

const p = require('path')
const fs = require('fs-extra')
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
   * @param {string[]} fileList
   * @returns {Promise<void>}
   */
  async loadConfiguration (fileList = FILE_LIST) {
    const path = await this._findConfiguration(fileList, this._cwd)

    let config = null

    if (path) {
      config = await this._processConfiguration(path)
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
   * @param {string} root
   * @returns {Promise<String|null>}
   */
  async _findConfiguration (fileList, root) {
    for (const file of fileList) {
      const path = p.normalize(`${root}/${file}`)
      const exists = await fs.exists(path)

      if (exists) {
        return path
      }
    }

    return null
  }

  /**
   * @private
   * @param {string} path
   * @returns {Promise<Object>}
   */
  async _processConfiguration (path) {
    const ext = p.extname(path).toLowerCase().substr(1)
    const buffer = await fs.readFile(path)
    const content = buffer.toString()

    let object = {}

    switch (ext) {
      case '':
      case TYPE_JSON:
        try {
          object = JSON.parse(content)
        } catch (exception) {
          // noop
        }
        break

      case TYPE_JAVASCRIPT:
        object = require(path)
        break

      case TYPE_YAML:
        try {
          object = yaml.safeLoad(content)
        } catch (exception) {
          // noop
        }
        break
    }

    return object
  }
}

module.exports = Configuration
