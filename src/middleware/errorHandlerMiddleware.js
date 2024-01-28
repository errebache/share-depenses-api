const ErrorHandler = require('../utils/ErrorHandler');

const errorHandlerMiddleware = (err, req, res, next) => {

  const isOperationalError = err instanceof ErrorHandler;
  const status = isOperationalError ? err.status : 500;

  if (!(err instanceof ErrorHandler)) {
    const locale = req.language || 'en'; 
    err = new ErrorHandler(status, err.message || 'INTERNAL_SERVER_ERROR', false, 'GENERIC_ERR', locale);
  }

  console.error(err);
  
  res.status(err.status).json({
    status: err.status,
    message: isOperationalError || process.env.NODE_ENV !== 'production' 
                ? err.message 
                : 'An unexpected error occurred',
    code: err.code,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
  next(err);
};

module.exports = errorHandlerMiddleware;
