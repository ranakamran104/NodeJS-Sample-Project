export default (sequelize, Sequelize) => {
  const Category = sequelize.define(
    "Category",
    {
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
    },
    {
      freezeTableName: true, // This option will prevent Sequelize from pluralizing the table name
    },
  )

  Category.associate = models => {
    Category.hasMany(models.BlogPosts, {
      foreignKey: "post_id",
      as: "BlogPosts",
    })
  }

  return Category
}
