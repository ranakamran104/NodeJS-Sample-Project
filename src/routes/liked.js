import express from "express"
import {
  findAllPostLikeds,
  findOnePostLikeds,
  createPostLikeds,
  // updatePostLikeds,
  deletePostLikeds,
} from "../controllers/PostLikedController.js"
import auth from "../middlewares/auth.js"

const postLikedRoutes = express.Router()

/**
 * @swagger
 * /liked/all-liked:
 *   get:
 *     summary: Get all liked posts
 *     tags:
 *       - PostLikeds
 *     responses:
 *       '200':
 *         description: A list of liked posts
 *       '401':
 *         description: Unauthorized
 */
postLikedRoutes.get("/all-liked", findAllPostLikeds)
/**
 * @swagger
 * /liked/create-liked:
 *   post:
 *     summary: Create a new liked post
 *     tags:
 *       - PostLikeds
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
 *                 type: string
 *                 example: "12345"
 *     responses:
 *       '201':
 *         description: Liked post created
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 */
postLikedRoutes.post("/create-liked", auth, createPostLikeds)
// postLikedRoutes.post("/update-liked", auth, updatePostLikeds)
/**
 * @swagger
 * /liked/delete-liked/{id}:
 *   delete:
 *     summary: Delete a liked post by ID
 *     tags:
 *       - PostLikeds
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
 *         description: Liked post deleted
 *       '404':
 *         description: Liked post not found
 *       '401':
 *         description: Unauthorized
 */
postLikedRoutes.delete("/delete-liked/:id", auth, deletePostLikeds)
/**
 * @swagger
 * /liked/{id}:
 *   get:
 *     summary: Get a liked post by ID
 *     tags:
 *       - PostLikeds
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: "12345"
 *     responses:
 *       '200':
 *         description: Liked post details
 *       '404':
 *         description: Liked post not found
 *       '401':
 *         description: Unauthorized
 */
postLikedRoutes.get("/:id", findOnePostLikeds)

export default postLikedRoutes
