const getResponse = require('../utils/getOrError');
const procedures = require('../db/procedures');

const TYPES = require('tedious').TYPES;

const ProfessorDataRepository = (dbFunctions) => {
    const getProfessorData = (req, res) => {
        let params = [
            {
                name: 'MATR',
                type: TYPES.VarChar,
                val: req.query.id
            },
            {
                name: 'DaAnnoP',
                type: TYPES.Int,
                val: req.query.from
            },
            {
                name: 'AAnnoP',
                type: TYPES.Int,
                val: req.query.to
            }
        ];
        dbFunctions.callProcedure(
            procedures.GET_PROFESSOR_DATA,
            params,
            function (error, data) {
                return res.json(getResponse(data, error));
            }
        );
    };

    return {getProfessorData};
};

module.exports = ProfessorDataRepository;