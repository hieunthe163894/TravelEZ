import express from 'express'
import { addComment, createPost, getAllPost} from '../Controllers/postController.js'

// import { verifyAdmin } from '../utils/verifyToken.js'

const router = express.Router()

//Get all posts
router.get('/', getAllPost)

//Create new post 
router.post('/', createPost)

// Add comment to a post
router.post('/:postId/comments', addComment);

export default router