const Request = require('tedious').Request
const connection = require('./connection')
const sendDbResponse = require('./utils/dbResponse')
const toJSON = require('./utils/rowToJSON')

const callProcedure = (query, params, callback) => {
  let data = []
  const dataSet = []
  const request = new Request(
    query,
    (error) => {
      sendDbResponse(error, dataSet, callback)
    }
  )
  params.forEach((param) => {
    const { name, type, val } = param
    request.addParameter(name, type, val)
  })
  request.on('row', (columns) => {
    toJSON(columns, data)
  })
  request.on('doneInProc', (rowCount, more, rows) => {
    dataSet.push(data)
    data = []
  })
  connection.callProcedure(request)
}

module.exports = { callProcedure }
