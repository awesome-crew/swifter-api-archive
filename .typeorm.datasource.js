require('dotenv').config();

const { createDatasourceConfig } = require('@awesome-dev/server-typeorm');

module.exports = createDatasourceConfig(__dirname, {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  charset: 'utf8mb4',
  migrationsRun: process.env.MYSQL_MIGRATIONS_RUN === 'true',
  logging: process.env.MYSQL_LOGGING === 'true',
});
