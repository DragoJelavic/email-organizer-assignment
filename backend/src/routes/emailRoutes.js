const emailController = require('../controllers/emailController');

async function emailRoutes(fastify, options) {
  fastify.get('/emails', emailController.list);
  fastify.get('/emails/:id', emailController.get);
  fastify.post('/emails', emailController.create);
  fastify.put('/emails/:id', emailController.update);
  fastify.delete('/emails/:id', emailController.delete);
}

module.exports = emailRoutes;
