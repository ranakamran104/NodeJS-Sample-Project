import fs from "fs"
import path from "path"
import Sequelize from "sequelize"
import { fileURLToPath } from "url"
import BlogPosts from "./BlogPosts.js"
import Users from "./Users.js"
import Category from "./Category.js"
import PostComment from "./PostComment.js"
import PostLikeds from "./PostLikeds.js"
// import dbConfig from "../config/config.json" assert { type: "json" };

// Get the filename and directory name in an ES module environment
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const basename = path.basename(__filename)

const env = process.env.NODE_ENV || "development"
const config = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../config/config.json"))
)[env]
// const config = dbConfig[env];
const db = {}

let sequelize

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  )
}

// fs.readdirSync(__dirname)
//   .filter(
//     file =>
//       file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js",
//   )
//   .forEach(file => {
//     // Import the model dynamically
//     import(path.join(__dirname, file))
//       .then(module => {
//         const model = module.default(sequelize, Sequelize.DataTypes)
//         // console.log("model", model)
//         db[model.name] = model
//         if (db[model.name].associate) {
//           console.log("kk", model.name)
//           db[model.name].associate(db)
//         }
//       })
//       .catch(err => {
//         console.error(`Error importing model ${file}:`, err)
//       })
//   })

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     console.log("kkppp", modelName)
//     db[modelName].associate(db)
//   }
// })

// db.sequelize = sequelize
// db.Sequelize = Sequelize

// export default db

db.Users = Users(sequelize, Sequelize)
db.Category = Category(sequelize, Sequelize)
db.BlogPosts = BlogPosts(sequelize, Sequelize)
db.PostComment = PostComment(sequelize, Sequelize)
db.PostLikeds = PostLikeds(sequelize, Sequelize)

// BlogPosts Associations
db.BlogPosts.hasMany(db.PostComment, { foreignKey: "post_id", as: "comments" })
db.BlogPosts.hasMany(db.PostLikeds, { foreignKey: "post_id", as: "likeds" })
db.BlogPosts.belongsTo(db.Users, { foreignKey: "user_id", as: "user" })
db.BlogPosts.belongsTo(db.Category, {
  foreignKey: "category_id",
  as: "category",
})

// PostComment Associations
db.PostComment.belongsTo(db.Users, { foreignKey: "user_id", as: "user" })
db.PostComment.belongsTo(db.BlogPosts, { foreignKey: "post_id", as: "post" })

// Users Associations
db.Users.hasMany(db.BlogPosts, { foreignKey: "user_id", as: "blogPosts" })
db.Users.hasMany(db.PostComment, { foreignKey: "user_id", as: "postComments" })
db.Users.hasMany(db.PostLikeds, { foreignKey: "user_id", as: "postLikeds" })

// PostLikeds Associations
db.PostLikeds.belongsTo(db.Users, { foreignKey: "user_id", as: "user" })
db.PostLikeds.belongsTo(db.BlogPosts, { foreignKey: "post_id", as: "blogPost" })

// Category Associations
db.Category.hasMany(db.BlogPosts, {
  foreignKey: "category_id",
  as: "blogPosts",
})

// BlogPosts.sync({ force: true });
// Users.sync({ force: true });
// Category.sync({ force: true });
// PostComment.sync({ force: true });
// PostLikeds.sync({ force: true });

// BlogPosts.sync();
// Users.sync();
// Category.sync();
// PostComment.sync();
// PostLikeds.sync();

// BlogPosts.sync({ alter: true });
// Users.sync({ alter: true });
// Category.sync({ alter: true });
// PostComment.sync({ alter: true });
// PostLikeds.sync({ alter: true });

// const syncDatabase = async () => {
//   await db.BlogPosts.sync({ alter: true });
//   await db.Users.sync({ alter: true });
//   await db.Category.sync({ alter: true });
//   await db.PostComment.sync({ alter: true });
//   await db.PostLikeds.sync({ alter: true });
// };

// syncDatabase().then(() => {
//   console.log('Database synchronized');
// }).catch((error) => {
//   console.error('Error synchronizing database:', error);
// });

export { sequelize }
export default db
