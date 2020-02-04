const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(403).send({ error: 'Forbidden' })
    }

    const token = authorization.replace('Bearer ', '')
    jwt.verify(token, process.env.JWT_KEY, async(err, payload) => {
        if (err) {
            return res.status(403).send({ error: 'Forbidden' })
        }
        const userNumber = payload.userNumber
        req.userNumber = userNumber
        next()
    })
}