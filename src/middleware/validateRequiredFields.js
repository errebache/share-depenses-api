const ErrorHandler = require('../utils/ErrorHandler');

const validateRequiredFields = (requiredFields) => {
  return (req, res, next) => {
    // Vérifier que `requiredFields` est bien un tableau
    if (!Array.isArray(requiredFields)) {
      return next(new ErrorHandler(500, 'Internal Server Error: requiredFields should be an array'));
    }

    for (const field of requiredFields) {
      if (!req.body[field]) {
        const errorMessage = `The field '${field}' is required.`;
        return res.status(400).json({ message: errorMessage });
      }
    }

    next(); // Passer au middleware suivant si tout est correct
  };
};

module.exports = validateRequiredFields;
