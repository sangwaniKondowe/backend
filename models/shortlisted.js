'use strict'

const dbConnection = require("../dbConnection")
const DataTypes = require("sequelize");
const Application = require("./application");
const Shortlisted = dbConnection.define('shorlist', {

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
    onUpdate: 'CASCADE'
})


module.exports = Shortlisted