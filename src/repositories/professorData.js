const getResponse = require('../utils/getOrError')
const procedures = require('../db/procedures')
const getRegistrationNumber = require('../utils/idExtractor')

const TYPES = require('tedious').TYPES

const ProfessorDataRepository = (dbFunctions) => {
    const getProfessorData = (req, res) => {

        const auth = req.headers['authorization']
        const { VarChar, Int } = TYPES
        let number = 0
        try {
            number = getRegistrationNumber(auth)
        } catch (error) {
            return res.status(403).send({ error: error })
        }
        const params = [
            { name: 'MATR', type: VarChar, val: getRegistrationNumber(auth) },
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