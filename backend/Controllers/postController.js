import Post from '../models/Post.js'

//Get All Posts
export const getAllPost = async (req, res) => {

   try {
      const posts = await Post.find({}).populate('author').populate('reviews').populate('tour')
      .populate('comments.author', 'username photo').exec();

      res.status(200).json({ success: true, message: 'Successfully', data: posts })
   } catch (error) {
      res.status(404).json({ success: false, message: error.message })
   }
}

//Create new post
export const createPost = async (req, res) => {
   const newPost = new Post(req.body)

   try {
      const savedPost = await newPost.save()

      res.status(200).json({ success: true, message: 'Successfully created', data: savedPost })
   } catch (error) {
      res.status(500).json({ success: false, message: error })
   }
}

// Hàm để thêm comment vào một post
export const addComment = async (req, res) => {
   try {
     const { postId } = req.params;
     const { text, author } = req.body;
 
     const post = await Post.findById(postId);
     if (!post) {
       return res.status(404).json({ message: 'Post not found' });
     }
 
     const newComment = {
       text,
       author,
       createdAt: new Date(),
     };
 
     post.comments.push(newComment);
     await post.save();
 
     const populatedPost = await Post.findById(postId).populate('comments.author', 'username photo');
 
     res.status(201).json(populatedPost);
   } catch (error) {
     console.error(error);
     res.status(500).json({ message: 'Server error' });
   }
 };
