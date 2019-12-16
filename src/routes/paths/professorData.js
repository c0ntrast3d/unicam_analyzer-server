const ProfessorDataRepository = require('../../repositories/professorData');
const callProcedure = require('../../db/callProcedure');

module.exports = function (router) {
    const professorDataRepository = ProfessorDataRepository(callProcedure);
    router.route('/professor_data')
        .get(professorDataRepository.getProfessorData);
};