require('dotenv') config();

 module.exports = {
  development: {
    database: process.env.DBNAME,
    password: process.env.DBPASSWORD,
    host: process.env.HOST,
    port: process.env.PORT,
    dialect: process.env.DIALECT
  },
  test: {
    database: process.env.DBTEST,
    password: process.env.DBPASSWORD,
    host: process.env.HOST,
    port: process.env.PORT,
    dialect: process.env.DIALECT
  },
  production: {
    use_env_variable: process.env.DATABASE_URL,
    dialect: process.env.DIALECT
  }
};

