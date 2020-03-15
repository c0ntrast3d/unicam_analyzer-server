const DossierSummaryRepository = require('../../repositories/dossierSummary')
const transactions = require('../../db/transactions')

module.exports = (router) => {
    const dossierSummaryRepository = DossierSummaryRepository(transactions)
    router.route('/dossier_summary/:from/:level')
        .get(dossierSummaryRepository.getDossierSummary)
}