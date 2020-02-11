const getResponse = require('../utils/getOrError')
const procedures = require('../db/procedures')

const TYPES = require('tedious').TYPES

const AvalilableDossiersRepository = (dbFunctions) => {
    const getDossierYears = (req, res) => {
        const { VarChar } = TYPES

        const params = [
            { name: '_matr', type: VarChar, val: req.userNumber },
        ]
        dbFunctions.callProcedure(
            procedures.GET_LATEST_DOSSIER_YEARS,
            params,
            (error, data) => {
                return res.json(getResponse(data, error))
            }
        )
    }

    return { getDossierYears }
}

module.exports = AvalilableDossiersRepository