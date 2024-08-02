import express from "express"
import {
  createUser,
  deleteUser,
  findAllUser,
  findOneUser,
  forgotPassword,
  loginUser,
  resetPassword,
  updatePassword,
  updateProfile,
} from "../controllers/UserController.js"
import Auth from "../middlewares/auth.js"

const userRoutes = express.Router()

/**
 * @swagger
 * /auth/addUsers:
 *   post:
 *     summary: Add a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 default: johndoe
 *               email:
 *                 type: string
 *                 default: rana.kamran@invozone.dev
 *               password:
 *                 type: string
 *                 default: johndoe
 *     responses:
 *       '200':
 *         description: User created successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Server Error
 *
 */
userRoutes.post("/addUsers", createUser)
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 default: rana.kamran@invozone.dev
 *               password:
 *                 type: string
 *                 default: johndoe
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *       '401':
 *         description: Unauthorized
 */
userRoutes.post("/login", loginUser)
/**
 * @swagger
 * /auth/delete:
 *   delete:
 *     summary: Delete a user
 *     tags:
 *       - Users
 *     security:
 *       - jwtAuth: []
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *       '401':
 *         description: Unauthorized
 */
userRoutes.delete("/delete", Auth, deleteUser)
/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Forgot password
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Password reset email sent
 */
userRoutes.post("/forgot-password", forgotPassword)
/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset password
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Password reset successfully
 */
userRoutes.post("/reset-password", resetPassword)
/**
 * @swagger
 * /auth/update-password:
 *   post:
 *     summary: Update password
 *     tags:
 *       - Users
 *     security:
 *       - jwtAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 default: zxcvbnm
 *               newPassword:
 *                 type: string
 *                 default: johndoe
 *     responses:
 *       '200':
 *         description: Password updated successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Server Error
 *       '401':
 *         description: Unauthorized
 */
userRoutes.post("/update-password", Auth, updatePassword)
/**
 * @swagger
 * /auth/update-profile:
 *   post:
 *     summary: Update profile
 *     tags:
 *       - Users
 *     security:
 *       - jwtAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Profile updated successfully
 *       '401':
 *         description: Unauthorized
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Server Error
 */
userRoutes.post("/update-profile", Auth, updateProfile)
/**
 * @swagger
 * /auth/user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags:
 *       - Users
 *     security:
 *       - jwtAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User found
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: User not found
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Server Error
 */
userRoutes.get("/user/:id", Auth, findOneUser)
/**
 * @swagger
 * /auth/all-user:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     security:
 *       - jwtAuth: []
 *     responses:
 *       '200':
 *         description: A list of users
 *       '401':
 *         description: Unauthorized
 */
userRoutes.get("/all-user", Auth, findAllUser)

// userRoutes.post('/refresh-token', userControllers.refreshToken);
// userRoutes.post('/logout', userControllers.logout);

export default userRoutes
