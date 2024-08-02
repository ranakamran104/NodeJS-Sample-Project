import "dotenv/config"
import db from "../models/index.js"
const error500 = "Internal Server Error"

// Create Category
export async function createCategory(req, res) {
  try {
    const { name, description } = req.body
    // Validate request
    if (!name || !description) {
      res.status(400).send({
        message: "Some fields missing!",
      })
      return
    }

    const doesCategoryExist = await db.Category.findOne({ where: { name } })
    if (doesCategoryExist) {
      res.send({ message: "Category already created" })
      return
    }
    const newCategory = new db.Category(req.body)
    await newCategory.save()
    res.status(201).send({ newCategory })
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating the category.",
    })
  }
}

// Delete Category
export async function deleteCategory(req, res) {
  try {
    const id = req.params.id
    // const { id } = req.body

    const deletedCategory = await db.Category.destroy({ where: { id } })

    if (deletedCategory === 0) {
      return res.status(404).json({ message: "Category not found" })
    }

    return res.status(200).send({ message: "Category deleted" })
  } catch (err) {
    return res.status(500).json({ message: error500 })
  }
}

// Update Category
export async function updateCategory(req, res) {
  try {
    const { id } = req.body
    const data = await db.Category.findByPk(id)

    const updateCategory = db.Category.update(
      {
        name: req.body?.name || data.name,
        description: req.body?.description || data.description,
      },
      { where: { id: id } },
    )

    if (updateCategory === 0) {
      return res.status(404).json({ message: "Category not found" })
    }

    return res.status(200).json({ message: "Category updated" })
  } catch (err) {
    return res.status(500).json({ message: error500 })
  }
}

// Find All Category
export async function findAllCategory(req, res) {
  try {
    const category = await db.Category.findAll({
      order: [["createdAt", "ASC"]],
    })
    if (category) {
      res.status(200).json({ data: category })
    } else {
      res.status(404).send({
        message: `Cannot find Categories.`,
      })
    }
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: error500 })
  }
}

// Fine One Category
export async function findOneCategory(req, res) {
  try {
    const id = req.params.id
    const category = await db.Category.findByPk(id)

    if (category) {
      res.status(200).send(category)
    } else {
      res.status(404).send({
        message: `Cannot find Category.`,
      })
    }
  } catch (err) {
    res.status(500).send({
      message: `Error retrieving Category. Please try again later.`,
    })
  }
}
