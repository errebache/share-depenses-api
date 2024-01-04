const createError = require('http-errors');
const i18next = require("i18next");

class ErrorHandler extends Error {
  constructor(
    status,
    messageKey,
    isOperational = true,
    code = null,
    locale = "en"
  ) {
    super();
    this.status = status || 500;
    this.message = i18next.t(messageKey, { lng: locale }) || "Error";
    this.isOperational = isOperational;
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorHandler;
