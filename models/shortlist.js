'use strict'

const dbConnection = require("../dbConnection")
const DataTypes = require("sequelize");
const Application = require("./application");
const Course = require("./course");
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
    onUpdate: 'CASCADE'
})

Course.belongsTo(Application)

Application.hasMany(Course, {
  foreignKey: 'applicationId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})


module.exports = Shortlisted