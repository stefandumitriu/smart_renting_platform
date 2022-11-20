// Update with your config settings.
const config = {
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 49153,
    user: 'postgres',
    password: 'postgrespw',
    database: 'postgres'
  },
  migrations: {
    directory: './migrations'
  }
};

module.exports = config;
