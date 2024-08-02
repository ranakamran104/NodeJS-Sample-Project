// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     await queryInterface.bulkInsert('PostComment', [
//       {
//         commentText: 'Great post!',
//         user_id: 1,
//         post_id: 1,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       {
//         commentText: 'Very informative.',
//         user_id: 2,
//         post_id: 2,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       }
//     ], {});
//   },

//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.bulkDelete('PostComment', null, {});
//   }
// };
