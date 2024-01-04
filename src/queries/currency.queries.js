const currencyModel = require("../database/models/currency.model");

exports.getAllCurrency = async () => {
    return await currencyModel.find()
}

exports.getCurrency = async (currencyId) => {
    return await currencyModel.findById(currencyId)
}
