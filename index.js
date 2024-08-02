// import { v2 as cloudinary } from "cloudinary"
import "dotenv/config"
import express from "express"
import "./src/models/index.js"
import { sequelize } from "./src/models/index.js"
import router from "./src/routes/index.js"
import swaggerDocs from "./swagger.js"
import startAllJobs from "./src/utils/cronJob.js"

const app = express()

app.disable("x-powered-by")
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set("port", process.env.PORT || 5001)
app.use(express.json({ limit: "50mb" }))
swaggerDocs(app, app.get("port"))
startAllJobs()

app.use("/api/v1", router)

app.all("*", (req, res) =>
  res.status(404).send({
    message: "Route Not Found!!!",
  }),
)

// cloudinary.config({
//   cloud_name: process.env.Cloud_Name,
//   api_key: process.env.API_Key,
//   api_secret: process.env.API_Secret,
// })

// Synchronize all models
sequelize
  .sync({ alter: true })
  .then(() => {
    // console.log("Database synchronized")
    app.listen(app.get("port"), () => {
      console.log(`App listening at http://localhost:${app.get("port")}`)
    })
  })
  .catch(err => {
    console.error("Unable to synchronize the database:", err)
  })
