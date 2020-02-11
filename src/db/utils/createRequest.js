const Request = require('tedious').Request
const sendDbResponse = require('./dbResponse')

const createRequest = (query, params, callback) => {
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
  return request
}

module.exports = createRequest
