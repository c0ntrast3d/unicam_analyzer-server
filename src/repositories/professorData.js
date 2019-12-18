const getResponse = require('../utils/getOrError')
const procedures = require('../db/procedures')

const TYPES = require('tedious').TYPES

const ProfessorDataRepository = (dbFunctions) => {
  const getProfessorData = (req, res) => {
    const { id, from, to } = req.params
    const { VarChar, Int } = TYPES
    const params = [
      { name: 'MATR', type: VarChar, val: id },
      { name: 'DaAnnoP', type: Int, val: from },
      { name: 'AAnnoP', type: Int, val: to }
    ]
    dbFunctions.callProcedure(
      procedures.GET_PROFESSOR_DATA,
      params,
      (error, data) => {
        return res.json(getResponse(data, error))
      }
    )
  }

  return { getProfessorData }
}

module.exports = ProfessorDataRepository
