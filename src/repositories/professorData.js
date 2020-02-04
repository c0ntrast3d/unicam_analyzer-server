const getResponse = require('../utils/getOrError')
const procedures = require('../db/procedures')

const TYPES = require('tedious').TYPES

const ProfessorDataRepository = (dbFunctions) => {
    const getProfessorData = (req, res) => {

        const { VarChar, Int } = TYPES

        const params = [
            { name: 'MATR', type: VarChar, val: req.userNumber },
            { name: 'DaAnnoP', type: Int, val: 2014 },
            { name: 'AAnnoP', type: Int, val: 2016 }
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