const async = require('async')
const pool = require('./connectionPool')
const sendDbResponse = require('./utils/dbResponse')
const toJSON = require('./utils/rowToJSON')
const Request = require('tedious').Request
const { GET_SECTION_DATA } = require('./procedures')

const TYPES = require('tedious').TYPES

const getDossierSummary = (callback) => {
    const sections = [1, 2, 3, 4]
    pool.acquire((err, connection) => {
            if (err) {
                console.error(err)
                return
            }
            console.log('Connection Pool Acquired ...')
            const { VarChar, Char, Int } = TYPES

            const delayRun = (data, cb) => {
                let tmp = []
                const dataSet = []
                const params = [
                    { name: 'Matr', type: VarChar, val: '000447' },
                    { name: '_Sez', type: Char, val: data },
                    { name: 'Livello', type: Int, val: 2 },
                    { name: 'DaAnno', type: Int, val: 2015 }
                ]
                const request = new Request(
                    GET_SECTION_DATA,
                    (error) => {
                        if (error) {
                            cb(error, null)
                        }
                        cb(null, dataSet)
                    }
                )
                params.forEach((param) => {
                    const { name, type, val } = param
                    request.addParameter(name, type, val)
                })
                request.on('row', (columns) => {
                    toJSON(columns, tmp)
                })
                request.on('doneProc', (rowCount, more, rows) => {
                    dataSet.push(tmp)
                    tmp = []
                })
                connection.callProcedure(request)
            }
            async.mapSeries(
                sections,
                delayRun,
                (error, result) => {
                    sendDbResponse(error, result, callback)
                })
        }) // end pool.acquire
}

module.exports = { getDossierSummary }