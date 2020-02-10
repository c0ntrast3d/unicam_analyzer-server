const getResponse = require('../utils/getOrError')
const procedures = require('../db/procedures')

const TYPES = require('tedious').TYPES

const DossierSummaryRepository = (dbFunctions) => {
    const getDossierSummary = (req, res) => {
        dbFunctions.executeTransaction()
        return res.status(200).send({})

    }
    return { getDossierSummary }
}

module.exports = DossierSummaryRepository