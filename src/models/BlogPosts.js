export default (sequelize, Sequelize) => {
  const BlogPosts = sequelize.define(
    "BlogPosts",
    {
      title: {
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.STRING,
      },
      image: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Category",
          key: "id",
        },
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
    },
    {
      freezeTableName: true, // This option will prevent Sequelize from pluralizing the table name
    },
  )

  BlogPosts.associate = models => {
    BlogPosts.belongsTo(models.Users, { foreignKey: "user_id", as: "users" })
    BlogPosts.belongsTo(models.Category, {
      foreignKey: "category_id",
      as: "category",
    })
    BlogPosts.hasMany(models.PostComment, { foreignKey: "post_id" })
    BlogPosts.hasMany(models.PostLikeds, { foreignKey: "post_id" })
  }

  return BlogPosts
}
