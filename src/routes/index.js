import { Router } from "express"
import userRoutes from "./user.js"
import categoryRoutes from "./category.js"
import postRoutes from "./post.js"
import commentRoutes from "./comments.js"
import postLikedRoutes from "./liked.js"

const router = Router()

router.use("/auth", userRoutes)
router.use("/category", categoryRoutes)
router.use("/post", postRoutes)
router.use("/comment", commentRoutes)
router.use("/liked", postLikedRoutes)

export default router
