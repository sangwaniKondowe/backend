'use strict'

const dbConnection = require("../dbConnection")
const DataTypes = require("sequelize");
const Application = require("./application");
<<<<<<< HEAD
const Course = require("./beneficiary");
=======
>>>>>>> f4a870acfd7a6505d20c6afa9369bb82fe360b68
const Beneficiary = require("./beneficiary");
const Shortlisted = dbConnection.define('shortlists', {

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
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true
  },
}, {

  timestamps: true
});

Shortlisted.belongsTo(Application)

Application.hasMany(Shortlisted, {
    foreignKey: 'applicationId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',

})


Beneficiary.belongsTo(Application)

Application.hasMany(Beneficiary, {
  foreignKey: 'applicationId',

Beneficiary.belongsTo(Shortlisted)

Shortlisted.hasOne(Beneficiary, {
  foreignKey: 'shortlistId',

  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})


module.exports = Shortlisted