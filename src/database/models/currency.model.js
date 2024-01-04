const mongoose = require("mongoose");

const currencySchema = mongoose.Schema({
    name: { type: String, required: true },
    symbol: { type: String, required: true },
    exchangeRate: { type: Number, required: true }
});

const currencyModel = mongoose.model("currencies", currencySchema);

module.exports = currencyModel;