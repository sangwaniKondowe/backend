'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('admins', [
       
      {
        id: 1,
        uuid: "68f40f88-999c-11ec-b909-0242ac120002",
        name: "Bachelor of Science in computer Science",
        regType: "bsc-com",  
        createdAt: new Date(),
        updatedAt: new Date(),
     },
     {
      id: 2,
      uuid: "68f40e70-999c-11ec-b909-0242ac120002",
      name: "Bachelor of Science in Networking Engineering",
      regType: "bsc-net", 
      createdAt: new Date(),
      updatedAt: new Date(),
   }, 
   {
    id: 3,
    uuid: "68f40d26-999c-11ec-b909-0242ac120002",
    name: "Bachelor of Science in Information Systems",
    regType: "bsc-info", 
    createdAt: new Date(),
    updatedAt: new Date(),
 }, 
  ], {});
    
  },

  async down (queryInterface, Sequelize) {
  
     await queryInterface.bulkDelete( 'admins', null, {});
     
  }
};