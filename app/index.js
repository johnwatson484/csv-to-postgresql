const { getCsvFiles, getCsvData } = require('./csv')
const { generateInsert, generateValues } = require('./script')
const generateSql = require('./sql')

const convertCsvToPostgreSql = async () => {
  const csvFiles = await getCsvFiles()

  for (const csvFile of csvFiles) {
    const data = await getCsvData(csvFile.path)
    const headers = data[0]
    const lines = data.slice(1)

    let statement = generateInsert(csvFile.name, headers)
    statement = generateValues(statement, lines)

    await generateSql(csvFile.name, statement)
  }
}

(async function () {
  await convertCsvToPostgreSql()
}())
