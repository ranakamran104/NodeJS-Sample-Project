"use strict"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "BlogPosts",
      [
        {
          title: "First post",
          content: "Content of the first post.",
          category_id: 1,
          user_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Second post",
          content: "Content of the second post.",
          category_id: 2,
          user_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Add more blog posts if needed
      ],
      {},
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("BlogPosts", null, {})
  },
}
