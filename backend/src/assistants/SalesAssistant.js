const Assistant = require('./Assistant');

class SalesAssistant extends Assistant {
  constructor() {
    super();
  }

  getSystemPrompt() {
    return `You are a sales email specialist. Generate concise, professional sales emails.
Requirements:
- Maximum 40 words total
- 7-10 words per sentence
- Professional but friendly tone
- Clear call-to-action
- Personalized when possible

Format your response as:
Subject: [Your subject line]
[Your email body]`;
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

module.exports = SalesAssistant;
