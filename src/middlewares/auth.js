import "dotenv/config"
import pkg from "jsonwebtoken"
const { verify } = pkg

const JWT_SECRET = process.env.JWT_SECRET

export default async (req, res, next) => {
  const token = req.header("Authorization")

  if (!token) return res.status(401).json({ message: "Token not found" })

  try {
    const payload = verify(token, JWT_SECRET)
    req.user = payload
    next()
  } catch (err) {
    return res.status(401).json({ message: "Expired or invalid token" })
  }
}
