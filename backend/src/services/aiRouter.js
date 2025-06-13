const OpenAI = require('openai');
const { OPENAI_API_KEY } = require('../config/env');

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

async function classifyEmail(email) {
  const prompt = `Classify the following email into one of these categories:
  - SALES: Outreach, proposals, business development
  - FOLLOWUP: Check-ins, reminders, status updates
  - OTHER: Everything else

  Email:
  From: ${email.from}
  Subject: ${email.subject}
  Body: ${email.body}

  Return only the category name.`;

  const completion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'gpt-4',
  });

  return completion.choices[0].message.content.trim();
}

module.exports = {
  classifyEmail,
};
