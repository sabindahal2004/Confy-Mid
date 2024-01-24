import express from 'express';
import Blog from '../models/BlogSchema.js';
import getAuth from '../middleware/auth.js';
const BlogRouter = express.Router();
BlogRouter.use(express.json());
BlogRouter.get('/', getAuth,async (req, res) => {
    try {
        const result = await Blog.find().populate("user","-password").sort("-createdTime");
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error });
    }
});

BlogRouter.post('/create', getAuth, async (req, res) => {
    try {
        const { title, content, image } = req.body;
        
        if (!title || !content) {
            return res.status(400).json({ error: "Title and content are required." });
        }

        const blog = new Blog({
            title,
            content,
            image,
            user: req.userId
        });

        await blog.save();
        res.status(200).json({ message: "Blog is created", blog });
    } catch (error) {
        res.status(400).json({ error });
    }
});

BlogRouter.delete('/delete/:id', getAuth, async (req, res) => {
    try {
        const blog = await Blog.findOneAndDelete({ user: req.userId, _id: req.params.id });

        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        res.status(200).json({ message: "Blog is deleted successfully" });
    } catch (error) {
        res.status(400).json({ error });
    }
});

BlogRouter.put('/update/:id', getAuth, async (req, res) => {
    try {
        const { title, content, image } = req.body;
        const updateBlog = await Blog.findOneAndUpdate(
            { user: req.userId, _id: req.params.id },
            { title, content, image },
            { new: true } // Return the updated document
        );

        if (!updateBlog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        res.status(200).json({ message: "Blog is updated", updateBlog });
    } catch (error) {
        res.status(400).json({ error });
    }
});

BlogRouter.get('/:id',getAuth, async(req,res)=>{
    await Blog.findById(req.params.id).populate("user","-password")
    .then(result => res.status(200).json(result))
    .catch(err => res.status(400).json({error:err}))
})

export default BlogRouter;
