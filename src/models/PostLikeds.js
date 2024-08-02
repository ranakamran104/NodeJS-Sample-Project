export default (sequelize, Sequelize) => {
  const PostLikeds = sequelize.define(
    "PostLikeds",
    {},
    {
      freezeTableName: true, // This option will prevent Sequelize from pluralizing the table name
    },
  )

  PostLikeds.associate = models => {
    PostLikeds.belongsTo(models.BlogPosts, {
      foreignKey: "post_id",
      as: "BlogPosts",
    })
    PostLikeds.belongsTo(models.Users, { foreignKey: "user_id", as: "Users" })
  }

  return PostLikeds
}
