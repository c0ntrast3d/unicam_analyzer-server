const express = require('express')

const createRouter = () => {
  const router = express.Router()
  require('./paths/professorData')(router)
  require('./paths/sectionData')(router)
  require('./paths/base')(router)
  return router
}

module.exports = createRouter
