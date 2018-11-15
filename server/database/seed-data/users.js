const bcrypt = require("bcrypt");

const users = [
  {
    email: "joeeasy@gmail.com",
    password: bcrypt.hashSync("password", 10),
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

module.exports = users;
