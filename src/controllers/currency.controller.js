const mongoose = require('mongoose');
const ErrorHandler = require('../utils/ErrorHandler');
const { getAllCurrency, getCurrency } = require("../queries/currency.queries");

exports.allCurrency = async (req, res, next) => {
  try {
      const currencies = await getAllCurrency();
      res.json(currencies);
  } catch (error) {
      next(new ErrorHandler(500, 'INTERNAL_SERVER_ERROR'));
  }
};

exports.getCurrency = async (req, res, next) => {
try {
  if (!req.params.id) {
    throw new ErrorHandler(400, 'BadRequest', true, 'Missing currency ID');
  }
  const currency = await getCurrency('id', req.params.id);
  if (!currency) {
    throw new ErrorHandler(404, 'CurrencyNotFound');
  }
  res.json(currency);
} catch (error) {
  if (error instanceof mongoose.CastError) {
    next(new ErrorHandler(400, 'INVALID_ID_FORMAT'));
  } else {
    next(error);
  }
}
};
