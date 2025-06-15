const fastify = require('fastify')({ logger: true });
const cors = require('@fastify/cors');
const emailRoutes = require('./routes/emailRoutes');
const aiRoutes = require('./routes/aiRoutes');
const validationErrorHandler = require('./middleware/validation');
const env = require('./config/env');
require('./config/database'); // Initialize database

// Register plugins
fastify.register(cors, {
  origin: true,
  credentials: true,
});

// Register routes
fastify.register(emailRoutes, { prefix: '/api' });
fastify.register(aiRoutes, { prefix: '/api/ai' });

// Register error handlers
fastify.setErrorHandler(validationErrorHandler);

// Health check endpoint
fastify.get('/api/health', async () => {
  return { status: 'ok' };
});

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: env.port, host: '0.0.0.0' });
    console.log(`Server listening on port ${env.port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
