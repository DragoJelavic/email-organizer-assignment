const AIService = require('./aiService');

class AIRouter {
  static async routeRequest(text) {
    try {
      const category = await AIService.classifyIntent(text);

      switch (category) {
        case 'SALES':
          return {
            type: 'SALES',
            assistant: 'SalesAssistant',
          };
        case 'FOLLOWUP':
          return {
            type: 'FOLLOWUP',
            assistant: 'FollowUpAssistant',
          };
        default:
          return {
            type: 'OTHER',
            assistant: null,
          };
      }
    } catch (error) {
      console.error('AI Routing Error:', error);
      throw new Error('Failed to route email request');
    }
  }
}

module.exports = AIRouter;
