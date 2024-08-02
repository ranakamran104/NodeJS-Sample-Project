import bcrypt from "bcrypt"
import "dotenv/config"
import jwt from "jsonwebtoken"
import db from "../models/index.js"
import generateToken from "../utils/generateToken.js"
import { SendEmail } from "../utils/sendEmail.js"
const JWT_SECRET = process.env.JWT_SECRET
const error500 = "Internal Server Error"

// Find All USERS
export async function findAllUser(req, res) {
  try {
    const users = await db.Users.findAll({
      attributes: ["id", "name", "email"],
      order: [["createdAt", "ASC"]],
    })
    res.status(200).json({ data: users })
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: error500 })
  }
}

// Fine One USER
export async function findOneUser(req, res) {
  try {
    const id = req.params.id
    const user = await db.Users.findByPk(id, {
      attributes: { exclude: ["password"] },
    })

    if (user) {
      res.send(user)
    } else {
      res.status(404).send({
        message: `Cannot find User.`,
      })
    }
  } catch (err) {
    // console.error(`Error retrieving User with id=${id}:`, err);
    res.status(500).send({
      message: `Error retrieving User. Please try again later.`,
    })
  }
}

// Create USER
export async function createUser(req, res) {
  try {
    const { name, email, password } = req.body
    // Validate request
    if (!name || !email || !password) {
      res.status(400).send({
        message: "Some fields missing!",
      })
      return
    }

    const doesUserExist = await db.Users.findOne({ where: { email } })
    if (doesUserExist) {
      res.send({ message: "User already registered" })
      return
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new db.Users({
      name,
      email,
      password: hashedPassword,
    })
    await newUser.save()
    res.send({ newUser })
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the User.",
    })
  }
}

// Login USER
export async function loginUser(req, res) {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      res.status(400).send({
        message: "Some fields missing!",
      })
      return
    }

    const user = await db.Users.findOne({ where: { email } })
    if (!user) {
      res.send({ message: "Invalid fields" })
      return
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      res.send({ message: "Wrong password" })
      return
    }

    const token = generateToken(user.id, JWT_SECRET)
    const { password: userPassword, ...userWithoutPassword } = user.toJSON()

    return res.status(200).json({ user: userWithoutPassword, token })
  } catch (err) {
    return res.status(500).json({ message: error500 })
  }
}

// Delete USER
export async function deleteUser(req, res) {
  try {
    const { id } = req.user

    const deletedUser = await db.Users.destroy({ where: { id } })

    if (deletedUser === 0) {
      return res.status(404).json({ message: "User not found" })
    }

    return res.status(204).send()
  } catch (err) {
    return res.status(500).json({ message: error500 })
  }
}

// Forgot Password
export async function forgotPassword(req, res) {
  try {
    const { email } = req.body
    const user = await db.Users.findOne({ where: { email } })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const resetToken = jwt.sign(
      { id: user.id, key: "password-reset" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    )

    // const resetToken = crypto.randomBytes(32).toString("hex")
    // const resetTokenExpiry = Date.now() + 3600000 // 1 hour from now

    // user.resetToken = resetToken
    // user.resetTokenExpiry = resetTokenExpiry
    // await user.save()

    const resetUrl = `http://your-frontend-url/reset-password?token=${resetToken}`

    await SendEmail(
      user.email,
      "Password Reset",
      `You requested a password reset. Click the link to reset your password: \n${resetUrl}`,
    )

    res.status(200).json({ message: "Password reset email sent" })
  } catch (err) {
    console.error("Error in forgot-password:", err)
    res.status(500).json({ message: error500 })
  }
}

// Reset Password
export async function resetPassword(req, res) {
  try {
    const { newPassword } = req.body
    const token = req.headers.authorization
    if (!token) {
      return res.status(401).json({ message: "Authorization token is missing" })
    }

    const decodedToken = jwt.verify(token, JWT_SECRET)

    if (decodedToken && decodedToken.key === "password-reset") {
      const userId = decodedToken.id || false
      if (!userId) {
        return res.status(401).json({ message: "Invalid token" })
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10)
      db.Users.update({ password: hashedPassword }, { where: { id: userId } })

      return res.status(200).send({ message: "Password reset successfully" })
    } else {
      return res.status(401).json({ message: "Invalid token" })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Internal server error" })
  }

  // try {
  //   const { resetToken, newPassword } = req.body
  //   const user = await db.Users.findOne({
  //     where: {
  //       resetToken: resetToken,
  //       resetTokenExpiry: { [db.Sequelize.Op.gt]: Date.now() },
  //     },
  //   })

  //   if (!user) {
  //     return res.status(400).json({ message: "Invalid or expired token" })
  //   }

  //   const hashedPassword = await bcrypt.hash(newPassword, 10)
  //   user.password = hashedPassword
  //   user.resetToken = null
  //   user.resetTokenExpiry = null
  //   await user.save()

  //   res.status(200).json({ message: "Password successfully reset" })
  // } catch (err) {
  //   console.error("Error in reset-password:", err)
  //   res.status(500).json({ message: "Internal Server Error" })
  // }
}

// Update Password
export async function updatePassword(req, res) {
  const { id } = req.user
  const { oldPassword, newPassword } = req.body

  try {
    const user = await db.Users.findOne({ where: { id } })
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid current password" })
    }

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(newPassword, salt)
    await user.save()

    res.status(200).json({ message: "Password changed successfully" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: error500 })
  }
}

// Update Profile
export async function updateProfile(req, res) {
  const { id } = req.user
  const { name } = req.body

  try {
    const user = await db.Users.findOne({ where: { id } })
    // const user = await db.Category.findByPk(id)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    user.name = name || user.name
    // user.age = age !== undefined ? age : user.age
    // user.address = address || user.address

    await user.save()

    res.status(200).json({ message: "Profile updated successfully", user })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: error500 })
  }
}

// // Retrieve all USERs from the database.
// exports.findAll = (req, res) => {
//   const title = req.query.title;
//   var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

//   Users.findAll({ where: condition })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials.",
//       });
//     });
// };

// // Find a single USER with an id
// exports.findOne = (req, res) => {
//   const id = req.params.id;

//   Users.findByPk(id)
//     .then((data) => {
//       if (data) {
//         res.send(data);
//       } else {
//         res.status(404).send({
//           message: `Cannot find User with id=${id}.`,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: "Error retrieving User with id=" + id,
//       });
//     });
// };

// // Update a USER by the id in the request
// exports.update = (req, res) => {
//   const id = req.params.id;

//   Users.update(req.body, {
//     where: { id: id },
//   })
//     .then((num) => {
//       if (num == 1) {
//         res.send({
//           message: "User was updated successfully.",
//         });
//       } else {
//         res.send({
//           message: `Cannot update User with id=${id}. Maybe Tutorial was not found or req.body is empty!`,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: "Error updating User with id=" + id,
//       });
//     });
// };

// // Delete a USER with the specified id in the request
// exports.delete = (req, res) => {
//   const id = req.params.id;

//   Users.destroy({
//     where: { id: id },
//   })
//     .then((num) => {
//       if (num == 1) {
//         res.send({
//           message: "User was deleted successfully!",
//         });
//       } else {
//         res.send({
//           message: `Cannot delete User with id=${id}. Maybe Tutorial was not found!`,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: "Could not delete User with id=" + id,
//       });
//     });
// };

// // Delete all USERs from the database.
// exports.deleteAll = (req, res) => {
//   Tutorial.destroy({
//     where: {},
//     truncate: false,
//   })
//     .then((nums) => {
//       res.send({ message: `${nums} User were deleted successfully!` });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || "Some error occurred while removing all Users.",
//       });
//     });
// };

// // find all published Tutorial
// exports.findAllPublished = (req, res) => {
//   Users.findAll({ where: { published: true } })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving Users."
//       });
//     });
// };
