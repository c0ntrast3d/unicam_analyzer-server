const rowToJSON = (columns, data) => {
    const result = {}
    columns.forEach((column) => {
        result[column.metadata.colName.toLowerCase()] = column.value
    })
    data.push(result)
}

module.exports = rowToJSON