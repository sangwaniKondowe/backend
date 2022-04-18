'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('courses', [
       
      {
        id: 1,
        uuid: "075af84a-a167-11ec-b909-0242ac120002",
        name:"bachesr",
        regType: "",
        createdAt: new Date(),
        updatedAt: new Date(),
     }, 
  ], {});
    
  },

  async down (queryInterface, Sequelize) {
  
     await queryInterface.bulkDelete( 'courses', null, {});
     
  }
};