'use strict'

const fs = require('fs')
const p = require('path')
const cp = require('child_process')

function getProjectRootDir (subdir = '') {
  return p.normalize(`${__dirname}/../../${subdir}`)
}

function getFixturesDir (subdir = '') {
  return p.normalize(`${__dirname}/../fixtures/${subdir}`)
}

function getFixturesFromDir (subdir = '') {
  const files = []
  const path = getFixturesDir(subdir)

  fs.readdirSync(path).forEach(fileName => {
    const filePath = p.normalize(`${path}/${fileName}`)
    files.push(filePath)
  })

  return files
}

function normalize (...paths) {
  return p.normalize(paths.join('/'))
}

function filename (path) {
  return p.basename(path)
}

function splitArgs (args = '') {
  return args.split(/\s+/)
}

function normalizeCliOutput (string) {
  return string.split(/\s+/g).join('')
}

function outputContains (output, subject) {
  return output.indexOf(subject) > -1
}

function execute (command = 'node', args = '', options = {}) {
  const cwd = options && options.cwd ? options.cwd : process.cwd()
  const stdio = options && options.stdio ? options.stdio : 'pipe'

  return new Promise((resolve, reject) => {
    let stdout = ''
    let stderr = ''

    const child = cp
      .spawn(command, splitArgs(args), {
        cwd: cwd,
        stdio: stdio
      })
      .on('error', error => {
        error.stderr = stderr
        reject(error, stderr)
      })
      .on('exit', (code, signal) => {
        let error

        if (signal) {
          error = new Error(`Process exited with signal: ${signal}`)
          error.stderr = stderr
          reject(error)

        } else if (code) {
          error = new Error(`Process exited with code: ${code}`)
          error.stderr = stderr
          reject(error)

        } else {
          resolve(stdout)
        }
      })

    child.stdout.on('data', data => { stdout += data.toString() })
    child.stderr.on('data', data => { stderr += data.toString() })
  })
}

module.exports = {
  getProjectRootDir,
  getFixturesDir,
  getFixturesFromDir,
  normalize,
  filename,
  normalizeCliOutput,
  outputContains,
  execute
}
