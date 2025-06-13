const AIRouter = require('../services/aiRouter');

class AIController {
  static async classifyIntent(request, reply) {
    try {
      const { prompt } = request.body;

      if (!prompt) {
        return reply.code(400).send({ error: 'Prompt is required' });
      }

      const result = await AIRouter.routeRequest(prompt);
      return reply.send(result);
    } catch (error) {
      console.error('Classification Error:', error);
      return reply
        .code(500)
        .send({ error: 'Failed to classify intent' });
    }
  }
}

module.exports = AIController;
