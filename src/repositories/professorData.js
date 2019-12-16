const getResponse = require('../utils/getResponse');
const procedures = require('../db/procedures');

const TYPES = require('tedious').TYPES;

const ProfessorDataRepository = (dbFunction) => {
    const getProfessorData = (req, res) => {
        let params = [
            {
                name: 'MATR',
                type: TYPES.VarChar,
                val: '000447'
            },
            {
                name: 'DaAnnoP',
                type: TYPES.Int,
                val: 2014
            },
            {
                name: 'AAnnoP',
                type: TYPES.Int,
                val: 2016
            }
        ];
        dbFunction(
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