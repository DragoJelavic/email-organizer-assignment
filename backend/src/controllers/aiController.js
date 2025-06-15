const { classifyEmail } = require('../services/aiRouter');
const {
  AssistantFactory,
} = require('../assistants/AssistantFactory');

const classifyAndProcess = async (request, reply) => {
  try {
    const { prompt } = request.body;

    console.log({ prompt, aiRouter });

    // Classify the prompt
    const classification = await classifyEmail(prompt);
    console.log('Classification result:', classification);

    // Create appropriate assistant
    const assistant = AssistantFactory.createAssistant(
      classification.type
    );
    if (!assistant) {
      return reply
        .code(500)
        .send({ error: 'Failed to create assistant' });
    }

    // Set headers for SSE
    reply.raw.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });

    // Stream the response
    await assistant.streamResponse(prompt, (chunk) => {
      const data = JSON.stringify(chunk);
      reply.raw.write(`data: ${data}\n\n`);
    });

    reply.raw.end();
  } catch (error) {
    console.error('AI Processing Error:', error);
    // Only send error if headers haven't been sent yet
    if (!reply.sent) {
      reply.code(500).send({ error: error.message });
    }
  }
};

async function streamResponse(req, res) {
  try {
    const { email, type } = req.body;

    if (!email || !email.from || !email.subject || !email.body) {
      return res.status(400).send({
        error:
          'Invalid email format. Required fields: from, subject, body',
      });
    }

    if (!type) {
      return res.status(400).send({
        error: 'Assistant type is required',
      });
    }

    // Create appropriate assistant
    const assistant = AssistantFactory.createAssistant(type);

    // Set up streaming response
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Stream the response
    await assistant.streamResponse(email, (chunk) => {
      res.write(`data: ${JSON.stringify({ content: chunk })}\n\n`);
    });

    res.end();
  } catch (error) {
    console.error('Streaming Error:', error);
    res.status(500).send({ error: 'Failed to stream response' });
  }
}

module.exports = {
  classifyAndProcess,
  streamResponse,
};
