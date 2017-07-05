'use strict'

const fs = require('fs')
const p = require('path')

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

module.exports = {
  getFixturesDir,
  getFixturesFromDir,
  normalize,
  filename
}
