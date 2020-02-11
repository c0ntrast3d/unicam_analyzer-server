const getResponse = require('../utils/getOrError')
const procedures = require('../db/procedures')
const createRequest = require('../db/utils/createRequest')

const TYPES = require('tedious').TYPES

const DossierSummaryRepository = (transactions) => {
  const getDossierSummary = (req, res) => {
    transactions.getDossierSummary((error, data) => {
      return res.json(getResponse(data, error))
    })
  }
  return { getDossierSummary }
}

module.exports = DossierSummaryRepository
