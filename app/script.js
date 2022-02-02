const generateInsert = (table, headers) => {
  let statement = `INSERT INTO public."${table}" (\n    `

  for (let i = 0; i < headers.length; i++) {
    statement = statement.concat(`"${headers[i]}"`)
    if (i < headers.length - 1) {
      statement = statement.concat(', ')
    }
  }

  statement = statement.concat(')\n')
  return statement
}

const generateValues = (statement, lines) => {
  for (let i = 0; i < lines.length; i++) {
    if (i === 0) {
      statement = statement.concat('VALUES ')
    }
    statement = statement.concat('(')
    for (let y = 0; y < lines[i].length; y++) {
      statement = statement.concat(`'${lines[i][y]}'`)
      if (y < lines[i].length - 1) {
        statement = statement.concat(', ')
      }
    }
    if (i < lines.length - 1) {
      statement = statement.concat('),\n    ')
    } else {
      statement = statement.concat(');')
    }
  }
  return statement
}

module.exports = {
  generateInsert,
  generateValues
}
