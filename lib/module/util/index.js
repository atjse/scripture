'use strict'

/**
 * @param {*} object
 * @returns {boolean}
 */
function isNull (object) {
  return object === null
}

/**
 * @param {*} object
 * @returns {boolean}
 */
function isArray (object) {
  return Array.isArray(object)
}

/**
 * @param {*} object
 * @returns {boolean}
 */
function isObject (object) {
  return Object.prototype.toString.call(object) === '[object Object]'
}

/**
 * @param {*} object
 * @returns {boolean}
 */
function isStringOrStringArray (object) {
  if (typeof object === 'string') {
    return true
  }

  if (isArray(object)) {
    for (const entry of object) {
      if (typeof entry !== 'string') {
        return false
      }
    }
    return true
  }

  return false
}

/**
 * @param {*} object
 * @returns {boolean}
 */
function isEmpty (object) {
  if (typeof object === 'undefined' || object === null) {
    return true
  }

  if (typeof object === 'number') {
    return isNaN(object) ||
      object === Number.NEGATIVE_INFINITY ||
      object === Number.POSITIVE_INFINITY
  }

  if (typeof object === 'string') {
    return object.trim().length === 0
  }

  if (isArray(object)) {
    return object.length === 0
  }

  if (isObject(object)) {
    return Object.keys(object).length === 0
  }

  return object.length && object.length === 0
}

/**
 * @param {*} object
 * @returns {string}
 */
function typeForError (object) {
  if (isNull(object)) {
    return 'null'
  }

  if (typeof object === 'string') {
    return object.trim().length > 0 ? 'string' : 'empty string'
  }

  if (isArray(object)) {
    return object.length > 0 ? 'array' : 'empty array'
  }

  if (isObject(object)) {
    return Object.keys(object).length > 0 ? 'object' : 'empty object'
  }

  return typeof object
}

/**
 * @param {*} object
 * @returns {Object|Array|null}
 */
function parseJSON (object) {
  if (typeof object === 'string') {
    try {
      return JSON.parse(object)
    } catch (error) {
      // noop
    }
  }

  return null
}

/**
 * @param {*} object
 * @returns {string}
 */
function dumpForError (object) {
  if (typeof object === 'undefined') {
    return 'undefined'
  }

  if (object === null) {
    return 'null'
  }

  if (typeof object === 'boolean') {
    return `boolean(${object})`
  }

  if (typeof object === 'number') {
    return `number(${object})`
  }

  if (typeof object === 'string') {
    return `string(${object.length}) "${object}"`
  }

  if (isArray(object)) {
    return JSON.stringify(object)
  }

  return object.toString()
}

/**
 * @param {string} flag
 * @returns {*}
 */
function flagToProperty (flag) {
  const parts = flag.split(/-+/g)

  let property = parts[1]

  for (let i = 2, len = parts.length, part; i < len; i++) {
    part = parts[i]
    property += part.charAt(0).toUpperCase() + part.substr(1)
  }

  return property
}

/**
 * @param {string} string
 * @returns {string}
 */
function denter (string) {
  let lines = string.split(/[\n\r]/g)

  // remove 1st blank line
  if (lines[0].trim().length === 0) {
    lines.splice(0, 1)
  }

  // remove last blank line
  if (lines[lines.length-1].trim().length === 0) {
    lines.splice(lines.length-1, 1)
  }

  // determine the indentation
  const indentation = (lines[0].match(/^\s+/) || [''])[0]

  // remove the determined indentation from the lines
  for (let i = 0, len = lines.length, line; i < len; i++) {
    line = lines[i]

    // trim indentation from line
    if (line.indexOf(indentation) === 0) {
      line = line.substr(indentation.length)
    }

    // replace blank/empty line with a single whitespace
    if (line.trim().length === 0) {
      line = ' '
    }

    lines[i] = line
  }

  return lines.join('\n')
}

function trimTrailingComma (string) {
  return string.replace(/,\s*$/, '')
}

module.exports = {
  isNull,
  isArray,
  isObject,
  isStringOrStringArray,
  isEmpty,
  typeForError,
  dumpForError,
  flagToProperty,
  parseJSON,
  denter,
  trimTrailingComma
}
