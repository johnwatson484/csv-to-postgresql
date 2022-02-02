const path = require('path')
const fs = require('fs').promises
const inputPath = path.join(__dirname, '..', 'input')
const outputPath = path.join(__dirname, '..', 'output')

const convertCsvToPostgreSql = async () => {
  const csvFiles = []

  const directory = await fs.readdir(inputPath)
  directory.filter(file => {
    return (file.indexOf('.') !== 0) && (file.slice(-4) === '.csv')
  })
  .forEach(file => {
    csvFiles.push({ path: path.resolve(inputPath, file), name: file.replace('.csv', '') })
  })

  for(const csvFile of csvFiles){
    const buffer = await fs.readFile(csvFile.path)
    const data = buffer.toString().trim().replace(/\r/g, '').split('\n').map(x=>x.split(','))
    const headers = data[0]
    const lines = data.slice(1)

    let statement = `INSERT INTO public."${csvFile.name}"(\n`

    for (let i = 0; i < headers.length; i++) {
      statement = statement.concat(`"${headers[i]}"`)
      if(i < headers.length -1){
        statement = statement.concat(', ')
      }
    }

    statement = statement.concat(')\n')

    for (let i = 0; i < lines.length; i++) {
      if(i === 0){
        statement = statement.concat('VALUES ')
      }
      statement = statement.concat('(')
      for (let y = 0; y < lines[i].length; y++) {
        statement = statement.concat(`'${lines[i][y]}'`)
        if(y < lines[i].length - 1){
          statement = statement.concat(', ')
        }
      }
      if(i < lines.length - 1){
        statement = statement.concat('),\n')
      } else {
        statement = statement.concat(');')
      }
    }

    const scriptName = `${csvFile.name}.sql`
    const scriptPath = path.resolve(outputPath, scriptName)

    await fs.writeFile(scriptPath,statement)
    console.log(`Generated ${scriptName}`)
  }
}

(async function () {
  await convertCsvToPostgreSql()
}())
