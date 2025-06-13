const OpenAI = require('openai');
const { OPENAI_API_KEY } = require('../config/env');

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

class BaseAssistant {
  constructor() {
    if (this.constructor === BaseAssistant) {
      throw new Error(
        'BaseAssistant is an abstract class and cannot be instantiated directly'
      );
    }
  }

  async generateResponse(prompt) {
    throw new Error(
      'generateResponse must be implemented by subclass'
    );
  }

  async streamResponse(prompt, onChunk) {
    try {
      const stream = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: this.getSystemPrompt(),
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        stream: true,
        temperature: 0.7,
      });

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        if (content) {
          onChunk(content);
        }
      }
    } catch (error) {
      console.error('Streaming Error:', error);
      throw new Error('Failed to stream AI response');
    }
  }

  getSystemPrompt() {
    throw new Error(
      'getSystemPrompt must be implemented by subclass'
    );
  }
}

module.exports = BaseAssistant;
