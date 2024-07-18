const path = require('path')
const fs = require('fs').promises
const INPUT_DIRECTORY = path.join(__dirname, '..', 'input')

const getCsvFiles = async () => {
  const csvFiles = []

  const directory = await fs.readdir(INPUT_DIRECTORY)

  directory.filter(file => {
    return (file.indexOf('.') !== 0) && (file.slice(-4) === '.csv')
  }).forEach(file => {
    csvFiles.push({ path: path.resolve(INPUT_DIRECTORY, file), name: file.replace('.csv', '') })
  })

  return csvFiles
}

const getCsvData = async (filepath) => {
  const buffer = await fs.readFile(filepath)
  return buffer.toString().trim().replace(/\r/g, '').split('\n').map(x => x.split(','))
}

module.exports = {
  getCsvFiles,
  getCsvData,
}
