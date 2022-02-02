const path = require('path')
const fs = require('fs').promises
const OUTPUT_DIRECTORY = path.join(__dirname, '..', 'output')

const generateSql = async (name, statement) => {
  const scriptName = `${name}.sql`
  const scriptPath = path.resolve(OUTPUT_DIRECTORY, scriptName)

  await fs.writeFile(scriptPath, statement)
  console.log(`Generated ${scriptName}`)
}

module.exports = generateSql
