'use strict'

const dbConnection = require("../dbConnection")
const DataTypes = require("sequelize");
<<<<<<< HEAD
const Beneficiary = dbConnection.define('beneficiaries', {
=======
const Course = dbConnection.define('beneficiaries', {
>>>>>>> f4a870acfd7a6505d20c6afa9369bb82fe360b68

  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  },
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
<<<<<<< HEAD
  },
=======
  }
>>>>>>> f4a870acfd7a6505d20c6afa9369bb82fe360b68
}, {

  timestamps: true
});

module.exports = Beneficiary