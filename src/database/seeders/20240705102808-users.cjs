"use strict"
const bcrypt = require("bcrypt")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const passwordHash = await bcrypt.hash("password1", 10)

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "user1",
          email: "user1@example.com",
          password: passwordHash,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "user2",
          email: "user2@example.com",
          password: passwordHash,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Add more users if needed
      ],
      {},
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {})
  },
}
