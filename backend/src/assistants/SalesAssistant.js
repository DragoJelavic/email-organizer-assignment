const { BaseAssistant } = require('./BaseAssistant');

class SalesAssistant extends BaseAssistant {
  async streamResponse(prompt, onChunk) {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a sales email specialist. Generate concise, professional sales emails.
            Requirements:
            - Maximum 40 words total
            - 7-10 words per sentence
            - Professional but friendly tone
            - Clear call-to-action
            - Personalized when possible`,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        stream: true,
      });

      let currentSubject = '';
      let currentBody = '';

      for await (const chunk of response) {
        const content = chunk.choices[0]?.delta?.content || '';
        if (content) {
          if (!currentSubject) {
            currentSubject = content;
            onChunk({ field: 'subject', content: currentSubject });
          } else {
            currentBody += content;
            onChunk({ field: 'body', content: currentBody });
          }
        }
      }
    } catch (error) {
      console.error('Sales Assistant Error:', error);
      throw error;
    }
  }

  async generateResponse(email) {
    const prompt = `Generate a professional sales response to the following email:
    From: ${email.from}
    Subject: ${email.subject}
    Body: ${email.body}

    The response should be persuasive, professional, and focused on converting the lead.`;

    const completion = await this.openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4',
    });

    return completion.choices[0].message.content;
  }

  async analyzeEmail(email) {
    const prompt = `Analyze this sales-related email and provide insights:
    From: ${email.from}
    Subject: ${email.subject}
    Body: ${email.body}

    Focus on:
    1. Lead quality
    2. Pain points mentioned
    3. Potential objections
    4. Urgency level`;

    const completion = await this.openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4',
    });

    return completion.choices[0].message.content;
  }

  async suggestNextSteps(email) {
    const prompt = `Based on this sales email, suggest next steps:
    From: ${email.from}
    Subject: ${email.subject}
    Body: ${email.body}

    Include:
    1. Immediate actions
    2. Follow-up timing
    3. Key points to address
    4. Potential objections to prepare for`;

    const completion = await this.openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4',
    });

    return completion.choices[0].message.content;
  }
}

module.exports = { SalesAssistant };
