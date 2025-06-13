const { ValidationError } = require('objection');

function validationErrorHandler(error, request, reply) {
  if (error instanceof ValidationError) {
    reply.status(400).send({
      error: 'Validation Error',
      details: error.data,
    });
    return;
  }
  throw error;
}

module.exports = validationErrorHandler;
