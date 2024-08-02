export default (sequelize, Sequelize) => {
  const PostComment = sequelize.define(
    "PostComment",
    {
      commentText: {
        type: Sequelize.STRING,
      },
      // post_id: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: "BlogPosts",
      //     key: "id",
      //   },
      // },
      // user_id: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: "Users",
      //     key: "id",
      //   },
      // },
    },
    {
      freezeTableName: true, // This option will prevent Sequelize from pluralizing the table name
    },
  )

  PostComment.associate = models => {
    PostComment.belongsTo(models.BlogPosts, {
      foreignKey: "post_id",
      as: "BlogPosts",
    })
    PostComment.belongsTo(models.Users, { foreignKey: "user_id", as: "Users" })
  }

  return PostComment
}
