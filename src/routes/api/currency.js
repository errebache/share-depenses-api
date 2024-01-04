const { allCurrency, getCurrency } = require('../../controllers/currency.controller');

const router = require('express').Router();

router.get('/', allCurrency);
router.get('/:currencyId', getCurrency);

module.exports = router;
