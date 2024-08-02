import "dotenv/config"
import db from "../models/index.js"
const error500 = "Internal Server Error"

// Create PostLikeds
export async function createPostLikeds(req, res) {
  try {
    const { id: userId } = req.user
    const { postId } = req.body
    const doesLikedExist = await db.PostLikeds.findOne({
      where: { post_id: postId, user_id: userId },
    })
    if (doesLikedExist) {
      res.send({ message: "Liked already created" })
      return
    }
    const newLiked = new db.PostLikeds({
      post_id: postId,
      user_id: userId,
    })
    await newLiked.save()
    res.status(201).send({ newLiked })
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating the PostLiked.",
    })
  }
}

// Delete PostLikeds
export async function deletePostLikeds(req, res) {
  try {
    const id = req.params.id
    // const { id } = req.body

    const deletedLiked = await db.PostLikeds.destroy({ where: { id } })

    if (deletedLiked === 0) {
      return res.status(404).json({ message: "Liked not found" })
    }

    return res.status(204).send()
  } catch (err) {
    return res.status(500).json({ message: error500 })
  }
}

// Update PostLikeds
// export async function updatePostLikeds(req, res) {
//   try {
//     const { id } = req.body
//     const data = await db.PostLikeds.findByPk(id)

//     const updateComment = db.PostLikeds.update(
//       {
//         commentText: req.body?.commentText || data.commentText,
//       },
//       { where: { id: id } }
//     )

//     if (updateComment === 0) {
//       return res.status(404).json({ message: "Comment not found" })
//     }

//     return res.status(204).send()
//   } catch (err) {
//     return res.status(500).json({ message: error500 })
//   }
// }

// Find All PostLikeds
export async function findAllPostLikeds(req, res) {
  try {
    const liked = await db.PostLikeds.findAll({
      order: [["createdAt", "ASC"]],
    })
    if (liked) {
      res.status(200).json({ data: liked })
    } else {
      res.status(404).send({
        message: `Cannot find PostLikeds.`,
      })
    }
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: error500 })
  }
}

// Fine One PostLikeds
export async function findOnePostLikeds(req, res) {
  try {
    const id = req.params.id
    const liked = await db.PostLikeds.findByPk(id)

    if (liked) {
      res.status(200).send(liked)
    } else {
      res.status(404).send({
        message: `Cannot find PostLikeds.`,
      })
    }
  } catch (err) {
    res.status(500).send({
      message: `Error retrieving PostLikeds. Please try again later.`,
    })
  }
}
