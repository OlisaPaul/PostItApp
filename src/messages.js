const { MESSAGES } = require("./constants");

const errorMessage = (data) => {
  return { message: MESSAGES.NOT_FOUND, success: false, data };
};

const successMessage = (message, data) => {
  return { message, success: true, data };
};

const unAuthMessage = (message) => {
  return { message, success: false };
};

exports.errorMessage = errorMessage;
exports.successMessage = successMessage;
exports.unAuthMessage = unAuthMessage;
