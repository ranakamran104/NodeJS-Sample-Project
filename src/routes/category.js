import express from "express"
import {
  findAllCategory,
  findOneCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/CategoryController.js"
import Auth from "../middlewares/auth.js"

const categoryRoutes = express.Router()

/**
 * @swagger
 * /category/all-category:
 *   get:
 *     summary: Get all categories
 *     tags:
 *       - Category
 *     responses:
 *       '200':
 *         description: A list of categories
 *       '401':
 *         description: Unauthorized
 */
categoryRoutes.get("/all-category", findAllCategory)
/**
 * @swagger
 * /category/create-category:
 *   post:
 *     summary: Create a new category
 *     tags:
 *       - Category
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
 *                 example: "Cloud Computing"
 *               description:
 *                 type: string
 *                 example: "Latest News and Opinions on Cloud Computing"
 *     responses:
 *       '201':
 *         description: Category created
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 */
categoryRoutes.post("/create-category", Auth, createCategory)
/**
 * @swagger
 * /category/update-category:
 *   post:
 *     summary: Update an existing category
 *     tags:
 *       - Category
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
 *               name:
 *                 type: string
 *                 example: "Cloud Computing"
 *               description:
 *                 type: string
 *                 example: "Latest News and Opinions on Cloud Computing"
 *     responses:
 *       '200':
 *         description: Category updated
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 */
categoryRoutes.post("/update-category", Auth, updateCategory)
/**
 * @swagger
 * /category/delete-category/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags:
 *       - Category
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
 *         description: Category deleted
 *       '404':
 *         description: Category not found
 *       '401':
 *         description: Unauthorized
 */
categoryRoutes.delete("/delete-category/:id", Auth, deleteCategory)
/**
 * @swagger
 * /category/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags:
 *       - Category
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: "12345"
 *     responses:
 *       '200':
 *         description: Category details
 *       '404':
 *         description: Category not found
 *       '401':
 *         description: Unauthorized
 */
categoryRoutes.get("/:id", findOneCategory)

export default categoryRoutes
