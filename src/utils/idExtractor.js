const jwt = require('jsonwebtoken')

const getRegistrationNumber = (token) => {
    return jwt.verify(token.replace('Bearer ', ''), process.env.JWT_KEY, (err, data) => {
        if (err) {
            throw 'Forbidden'
        }
        return data.userNumber
    })
}

module.exports = getRegistrationNumber