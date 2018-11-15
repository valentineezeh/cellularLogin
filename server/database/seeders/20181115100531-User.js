require("dotenv").config();
const userData = require("../seed-data/users");

module.exports = {
  up: queryInterface => queryInterface.bulkInsert("Users", userData, {}),

  down: queryInterface => queryInterface.bulkDelete("Users", null, {})
};
