const getOrError = (data, error) => {
  return error ? error : data
}

module.exports = getOrError