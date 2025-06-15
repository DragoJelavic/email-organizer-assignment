const { BaseAssistant } = require('./BaseAssistant');

class FollowUpAssistant extends BaseAssistant {
  constructor() {
    super();
  }

  getSystemPrompt() {
    return `You are a follow-up email specialist. Generate polite, professional follow-up emails.
Requirements:
- Courteous and respectful tone
- Clear reference to previous interaction
- Gentle reminder or check-in
- Professional closing

Format your response as:
Subject: [Your subject line]
[Your email body]`;
  }

  async generateResponse(email) {
    const prompt = `Generate a professional follow-up response to the following email:
    From: ${email.from}
    Subject: ${email.subject}
    Body: ${email.body}

    The response should be courteous, reference the previous interaction, and maintain a professional tone.`;

    const completion = await this.openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4',
    });

    return completion.choices[0].message.content;
  }

  async analyzeEmail(email) {
    const prompt = `Analyze this follow-up email and provide insights:
    From: ${email.from}
    Subject: ${email.subject}
    Body: ${email.body}

    Focus on:
    1. Previous interaction context
    2. Urgency level
    3. Key points to address
    4. Response priority`;

    const completion = await this.openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4',
    });

    return completion.choices[0].message.content;
  }

  async suggestNextSteps(email) {
    const prompt = `Based on this follow-up email, suggest next steps:
    From: ${email.from}
    Subject: ${email.subject}
    Body: ${email.body}

    Include:
    1. Response timing
    2. Key points to address
    3. Follow-up actions
    4. Priority level`;

    const completion = await this.openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4',
    });

    return completion.choices[0].message.content;
  }

  async streamResponse(prompt, onChunk) {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a follow-up email specialist. Generate polite, professional follow-up emails.
            Requirements:
            - Courteous and respectful tone
            - Clear reference to previous interaction
            - Gentle reminder or check-in
            - Professional closing`,
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
      console.error('Follow-up Assistant Error:', error);
      throw error;
    }
  }
}

module.exports = { FollowUpAssistant };
