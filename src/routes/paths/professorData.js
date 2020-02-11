const ProfessorDataRepository = require('../../repositories/professorData')
const dbFunctions = require('../../db/dbFunctions')

module.exports = (router) => {
    const professorDataRepository = ProfessorDataRepository(dbFunctions)
    router.route('/professor_data/:from/:to')
        .get(professorDataRepository.getProfessorData)
}