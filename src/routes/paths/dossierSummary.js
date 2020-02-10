const DossierSummaryRepository = require('../../repositories/dossierSummary')
const dbFunctions = require('../../db/dbFunctions')

module.exports = (router) => {
    const dossierSummaryRepository = DossierSummaryRepository(dbFunctions)
    router.route('/dossier_summary')
        .get(dossierSummaryRepository.getDossierSummary)
}