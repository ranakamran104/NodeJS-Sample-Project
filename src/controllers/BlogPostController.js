import "dotenv/config"
const error500 = "Internal Server Error"
import db from "../models/index.js"

// Create BlogPosts
export async function createPost(req, res) {
  try {
    const { id: userId } = req.user
    const { title, content, categoryId } = req.body
    console.log(req.file, req.image)
    if (!title || !content || !categoryId) {
      res.status(400).send({
        message: "Some fields missing!",
      })
      return
    }

    const doesPostExist = await db.BlogPosts.findOne({ where: { title } })
    if (doesPostExist) {
      res.send({ message: "Post already created" })
      return
    }

    // // Upload profile image to Cloudinary
    // let imageUrl = null
    // if (req.image) {
    //   const result = await cloudinary.uploader
    //     .upload_stream(
    //       { resource_type: "image", folder: "profile_images" },
    //       (error, result) => {
    //         if (error) {
    //           throw new Error("Cloudinary upload error")
    //         }
    //         return result
    //       },
    //     )
    //     .end(req.file.buffer)
    //   imageUrl = result.secure_url
    // }

    // // const uploadResult = await cloudinary.uploader
    // //    .upload(
    // //        'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
    // //            public_id: 'shoes',
    // //        }
    // //    )
    // //    .catch((error) => {
    // //        console.log(error);
    // //    });
    // console.log("imageUrl::", imageUrl)

    const newPost = new db.BlogPosts({
      title,
      content,
      category_id: categoryId,
      user_id: userId,
    })
    await newPost.save()
    // res.status(201).json(newPost)
    res.status(201).send({ newPost })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Delete BlogPosts
export async function deletePost(req, res) {
  try {
    const { id } = req.params
    const post = await db.BlogPosts.findOne({ where: { id } })
    if (!post) {
      return res.status(404).json({ error: "Blog post not found" })
    }
    await post.destroy()
    res.status(200).json({ message: "Blog post deleted" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Update BlogPosts
export async function updatePost(req, res) {
  try {
    const { id } = req.body
    const { title, content, categoryId } = req.body
    const post = await db.BlogPosts.findOne({ where: { id } })
    // const data = await db.BlogPosts.findByPk(id)
    if (!post) {
      return res.status(404).json({ error: "Blog post not found" })
    }
    post.title = title
    post.content = content
    post.category_id = categoryId
    await post.save()
    res.status(200).json(post)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
  // const updatePost = db.BlogPosts.update(
  //   {
  //     name: req.body?.name || data.name,
  //     content: req.body?.description || data.description,
  //     image: req.body?.image || data.image,
  //   },
  //   { where: { id: id } }
  // )

  // if (updatePost === 0) {
  //   return res.status(404).json({ message: "Post not found" })
  // }
}

// Find All BlogPosts
export async function findAllPost(req, res) {
  try {
    const checkPosts = await db.BlogPosts.findAll()
    if (checkPosts.length === 0) {
      return res.status(404).json({ error: "Blog post not found" })
    }
    const posts = await db.BlogPosts.findAll({
      include: [
        { model: db.Users, as: "user", attributes: ["name"] },
        { model: db.Category, as: "category", attributes: ["name"] },
        { model: db.PostComment, as: "comments" },
        { model: db.PostLikeds, as: "likeds" },
      ],
      order: [["createdAt", "ASC"]],
    })
    res.status(200).json({ data: posts })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Fine One BlogPosts
export async function findOnePost(req, res) {
  try {
    const { id } = req.params
    const checkPosts = await db.BlogPosts.findOne({ where: { id } })
    if (!checkPosts) {
      return res.status(404).json({ error: "Blog post not found" })
    }
    const post = await db.BlogPosts.findOne({
      where: { id },
      include: [
        { model: db.Users, as: "user", attributes: ["name"] },
        { model: db.Category, as: "category", attributes: ["name"] },
        {
          model: db.PostComment,
          as: "comments",
          required: false,
          include: [
            {
              model: db.Users,
              as: "user",
              attributes: ["name"],
              required: false,
            },
          ],
        },
        {
          model: db.PostLikeds,
          as: "likeds",
          required: false,
          include: [
            {
              model: db.Users,
              as: "user",
              attributes: ["name"],
              required: false,
            },
          ],
        },
      ],
    })
    console.log(post)
    if (!post) {
      return res.status(404).json({ error: "Blog post not found" })
    }
    res.status(200).json(post)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
}
