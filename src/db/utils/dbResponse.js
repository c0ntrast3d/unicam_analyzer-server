const getDBResponseOrError = (error, data, callback) => {
  error ? callback(error, false) : callback(null, data)
}

module.exports = getDBResponseOrError