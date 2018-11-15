'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
     email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: 'Enter a Valid Email' },
      }
    },
    password: {
      type: DataTypes.STRING,
    },
    socialLogin: {
      type: DataTypes.BOOLEAN
    },
    socialLoginType: {
      type: DataTypes.STRING
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};