const ConnectionPool = require('tedious-connection-pool')
const { poolConfig, poolConnectionConfig } = require('./configuration')

var pool = new ConnectionPool(poolConfig, poolConnectionConfig)

pool.on('error', function (err) {
  console.error(err)
})

module.exports = pool
