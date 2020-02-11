const express = require('express')
const requireAuth = require('../middleware/requireAuth')

const createRouter = () => {
    const router = express.Router()
    router.use(requireAuth)
    require('./paths/professorData')(router)
    require('./paths/sectionData')(router)
    require('./paths/base')(router)
    require('./paths/dossierSummary')(router)
    require('./paths/availableDossiers')(router)
    return router
}

module.exports = createRouter