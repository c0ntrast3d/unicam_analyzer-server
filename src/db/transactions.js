const async = require('async')
const createPool = require('./connectionPool')
const sendDbResponse = require('./utils/dbResponse')
const toJSON = require('./utils/rowToJSON')
const Request = require('tedious').Request
const { GET_SECTION_DATA } = require('./procedures')

const TYPES = require('tedious').TYPES

const getDossierSummary = (regNumber, from, level, callback) => {
    const sections = [1, 2, 3, 4]
    const pool = createPool()
    pool.acquire((err, connection) => {
            if (err) {
                console.error(err)
                return
            }
            const { VarChar, Char, Int } = TYPES

            const delayRun = (data, cb) => {
                let tmp = []
                const dataSet = []
                const params = [
                    { name: 'Matr', type: VarChar, val: regNumber },
                    { name: '_Sez', type: Char, val: data },
                    { name: 'Livello', type: Int, val: level },
                    { name: 'DaAnno', type: Int, val: from }
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
                    pool.drain()
                })
        }) // end pool.acquire
}

module.exports = { getDossierSummary }