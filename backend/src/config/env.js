require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  database: {
    client: 'sqlite3',
    connection: {
      filename: process.env.DATABASE_URL || './dev.sqlite3',
    },
    useNullAsDefault: true,
  },
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
};
