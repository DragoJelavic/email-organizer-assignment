const OpenAI = require('openai');
const { OPENAI_API_KEY } = require('../config/env');

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

class AIService {
  static async classifyIntent(text) {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `Classify the following email request into one of these categories:
- SALES: Outreach, proposals, business development
- FOLLOWUP: Check-ins, reminders, status updates
- OTHER: Everything else

Return only the category name.`,
          },
          {
            role: 'user',
            content: text,
          },
        ],
        temperature: 0.3,
        max_tokens: 10,
      });

      const category = response.choices[0].message.content
        .trim()
        .toUpperCase();
      return category;
    } catch (error) {
      console.error('AI Classification Error:', error);
      throw new Error('Failed to classify email intent');
    }
  }
}

module.exports = AIService;
