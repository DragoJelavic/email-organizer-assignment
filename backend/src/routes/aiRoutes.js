const AIController = require('../controllers/aiController');

async function aiRoutes(fastify, options) {
  fastify.post('/classify', AIController.classifyIntent);
}

module.exports = aiRoutes;
