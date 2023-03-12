const { MESSAGES } = require("./constants.common");

const errorMessage = (data, resource, resourceId = resource) => {
  return {
    message: MESSAGES.NOT_FOUND(resource, resourceId),
    success: false,
    data,
  };
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
