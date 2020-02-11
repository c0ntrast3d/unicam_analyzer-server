const AvalilableDossiersRepository = require('../../repositories/availableDossiers')
const dbFunctions = require('../../db/dbFunctions')

module.exports = (router) => {
    const avalilableDossiersRepository = AvalilableDossiersRepository(dbFunctions)
    router.route('/available_dossiers')
        .get(avalilableDossiersRepository.getDossierYears)
}