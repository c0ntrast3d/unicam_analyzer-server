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
    request.on('doneProc', (rowCount, more, rows) => {
        dataSet.push(data)
        data = []
    })
    connection.callProcedure(request)
}

const executeTransaction = () => {
    connection.beginTransaction((err) => {
        if (err) {
            console.error(err)
        }
        const req = new Request('SELECT * FROM [dbo].svd_lastupdate', (err) => console.error(err))
        req.on('row', (columns) => {
            console.log(columns)
        })
        connection.execSql(req)
        connection.commitTransaction((err) => {
            console.error('COMMITTED | ERROR :: ', err)
        })
        const req2 = new Request('SELECT * FROM [dbo].svd_lastupdate', (err) => console.error(err))
        req2.on('row', (columns) => {
            console.log(columns)
        })
        connection.execSql(req)
        connection.commitTransaction((err) => {
            console.error('COMMITTED 2 | ERROR :: ', err)
        })
    })
}

module.exports = { callProcedure, executeTransaction }