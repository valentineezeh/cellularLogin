const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    username: process.env.USER,
    database: process.env.DBNAME,
    password: process.env.DBPASSWORD,
    host: process.env.HOST,
    port: process.env.DBPORT,
    dialect: process.env.DIALECT
  },
  test: {
    username: process.env.USER,
    database: process.env.DBTEST,
    password: process.env.DBPASSWORD,
    host: process.env.HOST,
    port: process.env.DBPORT,
    dialect: process.env.DIALECT
  },
  production: {
    use_env_variable: process.env.DATABASE_URL,
    dialect: process.env.DIALECT
  }
};
