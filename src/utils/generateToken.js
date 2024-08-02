import pkg from "jsonwebtoken"
const { sign } = pkg

export default (id, secret) => {
  const jwtConfig = { expiresIn: "1h", algorithm: "HS256" }

  const payload = { id }

  const token = sign(payload, secret, jwtConfig)

  return token
}
