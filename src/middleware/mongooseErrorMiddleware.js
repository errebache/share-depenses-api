const ErrorHandler = require('../utils/ErrorHandler');

module.exports = (err, req, res, next) => {
  // Check if this is a Mongoose validation error
  if (err.name === 'ValidationError') {
    const locale = req.language || 'en'; // Determine the request's locale
    const errors = Object.values(err.errors).reduce((acc, { path, message }) => {
      // Accumulate the validation errors
      acc[path] = message;
      return acc;
    }, {});

    // Create a new instance of ErrorHandler for the validation error
    err = new ErrorHandler(400, 'VALIDATION_ERROR', true, errors, locale);
  }

  // Pass the error to the next error handling middleware
  next(err);
};
