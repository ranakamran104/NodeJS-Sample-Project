import "dotenv/config"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
})

export const SendEmail = async (email, subject, body) => {
  const options = {
    from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
    to: email,
    subject: subject,
    text: body,
    // html: options?.message,
    // attachments: attachments,
  }

  try {
    await transporter.sendMail(options)
  } catch (error) {
    console.error("Error sending email:", error)
  }
}
