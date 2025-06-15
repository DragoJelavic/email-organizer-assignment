const { classifyAndProcess } = require('../controllers/aiController');

const promptSchema = {
  type: 'object',
  required: ['prompt'],
  properties: {
    prompt: { type: 'string' },
  },
};

function aiRoutes(fastify, options, done) {
  // Classify and process prompt
  fastify.post(
    '/classify',
    {
      schema: {
        body: promptSchema,
      },
    },
    async (request, reply) => {
      return classifyAndProcess(request, reply);
    }
  );

  done();
}

module.exports = aiRoutes;
