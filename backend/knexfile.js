const env = require('./src/config/env');

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: env.database.connection.filename,
    },
    useNullAsDefault: true,
    migrations: {
      directory: './migrations',
    },
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './migrations',
    },
  },
  production: {
    client: 'sqlite3',
    connection: {
      filename: env.database.connection.filename,
    },
    useNullAsDefault: true,
    migrations: {
      directory: './migrations',
    },
  },
};
