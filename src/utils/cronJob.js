import cron from "node-cron"
import db from "../models/index.js"
import { Op } from "sequelize"

const job1 = cron.schedule("* * * * *", () => {
  console.log("Testing:: Running job1 every minute")
})

const job2 = cron.schedule("*/5 * * * *", async () => {
  console.log("Running a task every 5 minutes")

  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)

  try {
    const latestRecords = await db.Category.findAll({
      where: {
        [Op.or]: [
          { createdAt: { [Op.gte]: fiveMinutesAgo } },
          { updatedAt: { [Op.gte]: fiveMinutesAgo } },
        ],
      },
    })
    if (latestRecords.length > 0) {
      const recordsData = latestRecords.map(record => record.dataValues)
      //   console.log("Latest records:", latestRecords, recordsData)
      console.log("Latest records:", recordsData)
    } else {
      console.log("No new records found in the last 5 minutes.")
    }
  } catch (error) {
    console.error("Error fetching records:", error)
  }
})

const startAllJobs = () => {
  job1.start()
  job2.start()
}

export default startAllJobs
