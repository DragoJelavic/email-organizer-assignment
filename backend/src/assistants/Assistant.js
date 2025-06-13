const { OpenAI } = require('openai');

class Assistant {
  constructor() {
    if (this.constructor === Assistant) {
      throw new Error(
        'Assistant is an abstract class and cannot be instantiated directly'
      );
    }
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateResponse(email) {
    throw new Error(
      'generateResponse must be implemented by subclass'
    );
  }

  async analyzeEmail(email) {
    throw new Error('analyzeEmail must be implemented by subclass');
  }

  async suggestNextSteps(email) {
    throw new Error(
      'suggestNextSteps must be implemented by subclass'
    );
  }

  async streamResponse(prompt, onChunk) {
    try {
      const stream = await this.openai.chat.completions.create({
        model: 'gpt-4',
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
      console.error('Assistant Streaming Error:', error);
      throw new Error('Failed to stream response');
    }
  }

  getSystemPrompt() {
    throw new Error(
      'getSystemPrompt must be implemented by subclass'
    );
  }
}

module.exports = Assistant;
