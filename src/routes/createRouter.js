const express = require('express')

const createRouter = () => {
  const router = express.Router()
  const professorData = require('./paths/professorData')(router)
  return router
}

module.exports = createRouter