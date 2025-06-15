const { OpenAI } = require('openai');

class BaseAssistant {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async streamResponse(prompt, onChunk) {
    throw new Error('streamResponse must be implemented by subclass');
  }
}

module.exports = { BaseAssistant };
