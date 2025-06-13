const Assistant = require('./Assistant');

class FollowUpAssistant extends Assistant {
  constructor() {
    super();
  }

  getSystemPrompt() {
    return `You are a follow-up email specialist. Generate polite, professional follow-up emails.
Requirements:
- Courteous and respectful tone
- Clear reference to previous interaction
- Gentle reminder or check-in
- Professional closing`;
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
}

module.exports = FollowUpAssistant;
