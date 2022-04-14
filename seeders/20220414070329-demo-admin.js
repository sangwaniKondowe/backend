'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('admins', [
       
      {
        id: 1,
        uuid: "075af84a-a167-11ec-b909-0242ac120002",
        email: "johnnyCage@unima.ac.mw",
        password: "$2a$10$pJbMoWls6Kw03dmB6cczquzNNEvJH1mrJlsvD5d8gJB99q/pHjm5q",
        role: "ADMIN",
        createdAt: new Date(),
        updatedAt: new Date(),
     }, 
  ], {});
    
  },

  async down (queryInterface, Sequelize) {
  
     await queryInterface.bulkDelete( 'admins', null, {});
     
  }
};