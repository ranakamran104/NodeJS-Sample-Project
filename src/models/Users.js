export default (sequelize, Sequelize) => {
  const Users = sequelize.define(
    "Users",
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Email already exists",
        },
        validate: {
          isEmail: {
            args: true,
            msg: "Please enter a valid email address",
          },
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true, // This option will prevent Sequelize from pluralizing the table name
    },
  )

  Users.associate = models => {
    Users.hasMany(models.BlogPosts, { foreignKey: "post_id", as: "BlogPosts" })
    Users.hasMany(models.PostComment, {
      foreignKey: "comment_id",
      as: "PostComment",
    })
    Users.hasMany(models.PostLikeds, {
      foreignKey: "liked_id",
      as: "PostLikeds",
    })
  }

  return Users
}
