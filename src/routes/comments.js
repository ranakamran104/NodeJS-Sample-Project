import express from "express"
import {
  findAllComment,
  findOneComment,
  createComment,
  updateComment,
  deleteComment,
} from "../controllers/CommentController.js"
import auth from "../middlewares/auth.js"

const commentRoutes = express.Router()

/**
 * @swagger
 * /comment/all-comment:
 *   get:
 *     summary: Get all comments
 *     tags:
 *       - PostComment
 *     responses:
 *       '200':
 *         description: A list of comments
 *       '401':
 *         description: Unauthorized
 */
commentRoutes.get("/all-comment", findAllComment)
/**
 * @swagger
 * /comment/create-comment:
 *   post:
 *     summary: Create a new comment
 *     tags:
 *       - PostComment
 *     security:
 *       - jwtAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: integer
 *                 example: 12345
 *               commentText:
 *                 type: string
 *                 example: "This is a comment"
 *     responses:
 *       '201':
 *         description: Comment created
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 */
commentRoutes.post("/create-comment", auth, createComment)
/**
 * @swagger
 * /comment/update-comment:
 *   post:
 *     summary: Update an existing comment
 *     tags:
 *       - PostComment
 *     security:
 *       - jwtAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 12345
 *               commentText:
 *                 type: string
 *                 example: "Updated comment content"
 *     responses:
 *       '200':
 *         description: Comment updated
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 */
commentRoutes.post("/update-comment", auth, updateComment)
/**
 * @swagger
 * /comment/delete-comment/{id}:
 *   delete:
 *     summary: Delete a comment
 *     tags:
 *       - PostComment
 *     security:
 *       - jwtAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: "12345"
 *     responses:
 *       '200':
 *         description: Comment deleted
 *       '404':
 *         description: Comment not found
 *       '401':
 *         description: Unauthorized
 */
commentRoutes.delete("/delete-comment/:id", auth, deleteComment)
/**
 * @swagger
 * /comment/{id}:
 *   get:
 *     summary: Get a comment by ID
 *     tags:
 *       - PostComment
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: "12345"
 *     responses:
 *       '200':
 *         description: Comment details
 *       '404':
 *         description: Comment not found
 *       '401':
 *         description: Unauthorized
 */
commentRoutes.get("/:id", findOneComment)

export default commentRoutes
