'use strict'

const util = require('../util')
const Option = require('./Option')

/**
 * @private
 * @static
 * @param {*} [object]
 * @returns {Arguments}
 */
function __instantiate (object) {
  const args = new Arguments(object)

  const originalOption = args.option

  // add an anonymous, bounded function to prevent modifying the class prototype, when attaching the flags
  args.option = function(...args) { return originalOption.apply(this, args) }.bind(args)

  Object.defineProperty(args, 'arguments', {
    configurable: false,
    enumerable: true,
    get: function () {
      this._initialize()

      const processedArgs = this._processedArgs.slice(0)
      processedArgs.main = processedArgs[0]

      return processedArgs
    }.bind(args)
  })

  return args
}

class Arguments {
  /**
   * @param {*} object
   * @returns {Arguments}
   */
  static parse (object) {
    return __instantiate(object)
  }

  /**
   * @param {string} usage
   * @returns {Arguments}
   */
  static usage (usage) {
    return __instantiate().usage(usage)
  }

  /**
   * @param {Object} object
   * @returns {Arguments}
   */
  static package (object) {
    return __instantiate().package(object)
  }

  /**
   * @param {string|string[]} flags
   * @param {string}          [description]
   */
  static option (flags, description) {
    return __instantiate().option(flags, description)
  }

  /**
   * @returns {Arguments}
   */
  static getDefaultArguments () {
    return Arguments
      .usage('scripture [options] npm-script-name')
      .option('-c, --config', 'Custom configuration file.')
      .option('-h, --help', 'Show help.')
      .option('-v, --version', 'Show version.')
  }

  /**
   * @param {*} object
   */
  constructor (object) {
    /**
     * @private
     * @type {boolean}
     */
    this._initialized = false
    /**
     * @private
     * @type {Option[]}
     */
    this._options = []

    if (typeof object === 'undefined') {
      object = process.argv
    }

    this.setArguments(object)
  }

  setName (name) {
    this._name = typeof name === 'string' ? name : null
    return this
  }

  setVersion (version) {
    this._version = typeof version === 'string' ? version : null
    return this
  }

  setLicense (license) {
    this._license = typeof license === 'string' ? license : null
    return this
  }

  setAuthor (author) {
    this._author = typeof author === 'string' ? author : null
    return this
  }

  getHeader () {
    return `${this._name} ${this._version}\n${this._license} @ ${this._author}`
  }

  /**
   * @param {*} object
   */
  setArguments (object) {
    function processPart (str) {
      str = str.trim()
      return str.length > 0 ? str.split(/\s+/g) : []
    }

    if (typeof object === 'string') {
      object = processPart(object)
    }

    if (!Array.isArray(object)) {
      object = []
    }

    const args = []

    for (const entry of object) {
      for (const processed of processPart(entry)) {
        args.push(processed)
      }
    }

    /**
     * @private
     * @type {string[]}
     */
    this._processedArgs = args.slice(2) // remove node and script arguments
  }

  /**
   * @returns {number}
   */
  numArguments () {
    return this._processedArgs.length
  }

  /**
   * @returns {boolean}
   */
  hasArguments () {
    return this.numArguments() > 0
  }

  /**
   * @param {string} name
   * @returns {boolean}
   */
  hasArgument (name) {
    return this._processedArgs.indexOf(name) > -1
  }

  setUsage (usage) {
    this._usage = usage
    return this
  }

  getUsage () {
    return this._usage
  }

  package (object) {
    this
      .setName(object.name)
      .setVersion(object.version)
      .setLicense(object.license)
      .setAuthor(object.author)

    return this
  }

  usage (usage) {
    this.setUsage(usage)
    return this
  }

  /**
   * @param {string|string[]} flags
   * @param {string}          [description]
   * @returns {Arguments}
   */
  option (flags, description) {
    this.addOption(new Option(flags, description))
    return this
  }

  /**
   * @param {Option} option
   * @returns {Arguments}
   */
  addOption (option) {
    if (!this.hasOption(option)) {
      this._options.push(option)
      this._attachOption(option)
    }

    return this
  }

  /**
   * @returns {boolean}
   */
  hasOption (flags) {
    return this.getOption(flags) !== null
  }

  /**
   * @param flags
   * @returns {Option|null}
   */
  getOption (flags) {
    for (const option of this.getOptions()) {
      if (option.hasFlag(flags)) {
        return option
      }
    }

    return null
  }

  numOptions () {
    return this.getOptions().length
  }

  hasOptions () {
    return this.numOptions() > 0
  }

  getOptions () {
    return this._options
  }

  getHelp() {
    this._initialize()

    let help = util.denter(`
      ${this._name} ${this._version}
      ${this._license} @ ${this._author}
      
      Usage: 
        $ ${this.getUsage()}
    `)

    if (this.hasOptions()) {
      let options = util.denter(`
        Options      
      `)

      // the minimum margin between the comma-separated flag list and the description
      const minMargin = ' '.repeat(4)

      // determine the longest flag width as comma-separated string
      let maxFlagListWidth = 0

      for (const option of this.getOptions()) {
        let flags = ''

        for (const flag of option.getFlags()) {
          flags += `${flag}, `
        }

        flags = util.trimTrailingComma(flags)

        if (flags.length > maxFlagListWidth) {
          maxFlagListWidth = flags.length
        }
      }

      for (const option of this.getOptions()) {
        let flags = ''

        for (const flag of option.getFlags()) {
          flags += `${flag}, `
        }

        flags = util.trimTrailingComma(flags).padEnd(maxFlagListWidth)

        options += '\n  ' + util.denter(`
          ${flags}${minMargin}${option.getDescription()}
        `)
      }

      help += '\n \n' + options + '\n '
    }

    return help
  }

  /**
   * @returns {string}
   */
  getVersion () {
    this._initialize()

    return this._version
  }

  _initialize () {
    if (this._initialized) {
      return
    }

    // TODO: store [node/binary, script] in a separate variable
    // remove the first 2 entries [binary, script]
    // this._processedArgs.splice(0, 2)

    // process options
    for (const option of this.getOptions()) {
      option._processArgs(this._processedArgs)
    }

    this._initialized = true
  }

  /**
   * @private
   * @param {Option} option
   */
  _attachOption (option) {
    for (const flag of option.getFlags()) {
      const property = util.flagToProperty(flag)

      Object.defineProperty(this.option, property, {
        configurable: false,
        enumerable: true,
        get: () => {
          this._initialize()
          return option._getter()
        }
      })

      //console.log(this.option)
    }
  }
}

module.exports = Arguments
