import "dotenv/config"
import db from "../models/index.js"
const error500 = "Internal Server Error"

// Create Comment
export async function createComment(req, res) {
  try {
    const { id: userId } = req.user
    const { commentText, postId } = req.body
    // Validate request
    if (!commentText) {
      res.status(400).send({
        message: "Some fields missing!",
      })
      return
    }

    // const doesCommentExist = await db.PostComment.findOne({ where: { name } })
    // if (doesCommentExist) {
    //   res.send({ message: "Comment already created" })
    //   return
    // }
    // const newComment = new db.PostComment(req.body)
    const newComment = new db.PostComment({
      commentText,
      post_id: postId,
      user_id: userId,
    })
    await newComment.save()
    res.status(201).send({ newComment })
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating the Comment.",
    })
  }
}

// Delete Comment
export async function deleteComment(req, res) {
  try {
    const id = req.params.id
    // const { id } = req.body

    const deletedComment = await db.PostComment.destroy({ where: { id } })

    if (deletedComment === 0) {
      return res.status(404).json({ message: "Comment not found" })
    }

    return res.status(200).send({ message: "Comment deleted" })
  } catch (err) {
    return res.status(500).json({ message: error500 })
  }
}

// Update Comment
export async function updateComment(req, res) {
  try {
    const { id } = req.body
    const data = await db.PostComment.findByPk(id)

    const updateComment = db.PostComment.update(
      {
        commentText: req.body.commentText || data.commentText,
      },
      { where: { id: id } },
    )

    if (updateComment === 0) {
      return res.status(404).json({ message: "Comment not found" })
    }

    return res.status(200).send({ message: "Comment Updated" })
  } catch (err) {
    return res.status(500).json({ message: error500 })
  }
}

// Find All Comment
export async function findAllComment(req, res) {
  try {
    const comment = await db.PostComment.findAll({
      order: [["createdAt", "ASC"]],
    })
    if (comment) {
      res.status(200).json({ data: comment })
    } else {
      res.status(404).send({
        message: `Cannot find Comments.`,
      })
    }
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: error500 })
  }
}

// Fine One Comment
export async function findOneComment(req, res) {
  try {
    const id = req.params.id
    const comment = await db.PostComment.findByPk(id)

    if (comment) {
      res.status(200).send(comment)
    } else {
      res.status(404).send({
        message: `Cannot find Comment.`,
      })
    }
  } catch (err) {
    res.status(500).send({
      message: `Error retrieving Comment. Please try again later.`,
    })
  }
}
