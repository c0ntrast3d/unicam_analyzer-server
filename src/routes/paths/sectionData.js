const SectionDataRepository = require('../../repositories/sectionData')
const dbFunctions = require('../../db/dbFunctions')

module.exports = (router) => {
    const sectionDataRepository = SectionDataRepository(dbFunctions)
    router.route('/section_data/:section/:level/:from')
        .get(sectionDataRepository.getSectionData)
}