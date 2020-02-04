const getResponse = require('../utils/getOrError')
const procedures = require('../db/procedures')

const TYPES = require('tedious').TYPES

const SectionDataRepository = (dbFunctions) => {
    const getSectionData = (req, res) => {
        const { section, level, from } = req.params
        const { VarChar, Char, Int } = TYPES
        const params = [
            { name: 'Matr', type: VarChar, val: req.userNumber },
            { name: '_Sez', type: Char, val: section },
            { name: 'Livello', type: Int, val: level },
            { name: 'DaAnno', type: Int, val: from }
        ]
        dbFunctions.callProcedure(
            procedures.GET_SECTION_DATA,
            params,
            (error, data) => {
                return res.json(getResponse(data, error))
            }
        )
    }

    return { getSectionData }
}

module.exports = SectionDataRepository