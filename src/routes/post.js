import express from "express"
import {
  createPost,
  findAllPost,
  findOnePost,
  updatePost,
  deletePost,
} from "../controllers/BlogPostController.js"
import Auth from "../middlewares/auth.js"

const postRoutes = express.Router()

/**
 * @swagger
 * /post/all-post:
 *   get:
 *     summary: Get all posts
 *     tags:
 *       - BlogPosts
 *     responses:
 *       '200':
 *         description: A list of posts
 *       '401':
 *         description: Unauthorized
 */
postRoutes.get("/all-post", findAllPost)
/**
 * @swagger
 * /post/create-post:
 *   post:
 *     summary: Create a new post
 *     tags:
 *       - BlogPosts
 *     security:
 *       - jwtAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Post Title"
 *               content:
 *                 type: string
 *                 example: "Post content goes here..."
 *               categoryId:
 *                 type: integer
 *                 example: "Category ID goes here..."
 *     responses:
 *       '201':
 *         description: Post created
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 */
postRoutes.post("/create-post", Auth, createPost)
/**
 * @swagger
 * /post/update-post:
 *   post:
 *     summary: Update an existing post
 *     tags:
 *       - BlogPosts
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
 *                 type: string
 *                 example: "12345"
 *               title:
 *                 type: string
 *                 example: "Updated Post Title"
 *               content:
 *                 type: string
 *                 example: "Updated post content goes here..."
 *               categoryId:
 *                 type: string
 *                 example: "Updated post category ID here..."
 *     responses:
 *       '200':
 *         description: Post updated
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 */
postRoutes.post("/update-post", Auth, updatePost)
/**
 * @swagger
 * /post/delete-post/{id}:
 *   delete:
 *     summary: Delete a post
 *     tags:
 *       - BlogPosts
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
 *         description: Post deleted
 *       '404':
 *         description: Post not found
 *       '401':
 *         description: Unauthorized
 */
postRoutes.delete("/delete-post/:id", Auth, deletePost)
/**
 * @swagger
 * /post/{id}:
 *   get:
 *     summary: Get a post by ID
 *     tags:
 *       - BlogPosts
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: "12345"
 *     responses:
 *       '200':
 *         description: Post details
 *       '404':
 *         description: Post not found
 *       '401':
 *         description: Unauthorized
 */
postRoutes.get("/:id", findOnePost)

export default postRoutes
