"use strict";

const { DataTypes } = require("sequelize");
module.exports = {
  up: async (queryInterface, Sequelize) => {
   //addcolumn("table name","foreign key")
    return await queryInterface
      .addColumn("shortlisteds", "applicationId", {
        type: DataTypes.INTEGER,
        references: {
          model: "applications", // name of Target model
          key: "id", // key in Target model that we're referencing
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
      })
     },
    down: async (queryInterface, Sequelize) => {
       return await queryInterface
         .removeColumn("shortlisteds", "applicationId")
    },
};