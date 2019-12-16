const getResponse = (data, error) => {
    return error ? error : data;
};

module.exports = getResponse;