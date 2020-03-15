const ConnectionPool = require('tedious-connection-pool')
const { poolConfig, poolConnectionConfig } = require('./configuration')



const createPool = () => {
    var pool = new ConnectionPool(poolConfig, poolConnectionConfig)

    pool.on('error', function(err) {
        console.error(err)
    })

    return pool
}

module.exports = createPool