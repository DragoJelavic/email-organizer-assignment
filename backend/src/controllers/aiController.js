const { classifyEmail } = require('../services/aiRouter');
const AssistantFactory = require('../assistants/AssistantFactory');

async function classifyAndProcess(request, reply) {
  try {
    const { prompt } = request.body;

    if (!prompt) {
      return reply.code(400).send({
        error: 'Prompt is required',
      });
    }

    // First classify the prompt
    const classification = await classifyEmail({ body: prompt });

    // Create appropriate assistant based on classification
    const assistant =
      AssistantFactory.createAssistant(classification);

    // Set up streaming response
    reply.raw.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });

    // Stream the response
    await assistant.streamResponse(prompt, (chunk) => {
      reply.raw.write(
        `data: ${JSON.stringify({ content: chunk })}\n\n`
      );
    });

    reply.raw.end();
  } catch (error) {
    console.error('AI Processing Error:', error);
    return reply
      .code(500)
      .send({ error: 'Failed to process prompt' });
  }
}

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
