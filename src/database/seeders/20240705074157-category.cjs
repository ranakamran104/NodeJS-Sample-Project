"use strict"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Category",
      [
        {
          name: "Technology",
          description: "Posts about the latest in technology.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Health",
          description: "Health and wellness tips and news.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Travel",
          description: "Travel guides, tips, and stories.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Education",
          description: "Educational resources and discussions.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Category", null, {})
  },
}
