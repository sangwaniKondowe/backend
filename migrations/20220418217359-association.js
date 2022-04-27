"use strict";

const { DataTypes } = require("sequelize");
module.exports = {
  up: async (queryInterface, Sequelize) => {
   //addcolumn("table name","foreign key")
    return await queryInterface
      .addColumn("shortlists", "applicationId", {
        type: DataTypes.INTEGER,
        references: {
          model: "applications", // name of Target model
          key: "id", // key in Target model that we're referencing
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
      }).then(async () => {
<<<<<<< HEAD
        return await queryInterface.addColumn("beneficiaries", "applicationId", {
=======
        return await queryInterface.addColumn("beneficiaries", "shortlistId", {
>>>>>>> f4a870acfd7a6505d20c6afa9369bb82fe360b68
          type: DataTypes.INTEGER,
          references: {
            model: "shortlists", // name of Target model
            key: "id", // key in Target model that we're referencing
          },
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
        });
        })
     },
    down: async (queryInterface, Sequelize) => {
       return await queryInterface
         .removeColumn("shortlists", "applicationId")
         .then(async () => {
<<<<<<< HEAD
          return await queryInterface.removeColumn("beneficiaries", "applicationId");
=======
          return await queryInterface.removeColumn("beneficiaries", "shortlistId");
>>>>>>> f4a870acfd7a6505d20c6afa9369bb82fe360b68
        })
    },
};