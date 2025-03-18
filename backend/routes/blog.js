const express = require('express') 
const router = express.Router()
const fetchuser = require('../middleware/fetchuser') //to authenticate the user
const Blog = require('../models/Blog')

//route 1->add note
router.post('/addblog',fetchuser,async(req,res)=>{
    try {
        const {title,content,author,tags}=req.body;
        if (!title || !content || !author ) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const validatedTags = Array.isArray(tags) ? tags.map(String) : [];
        const newBlog= new Blog({
            title,
            content,
            author,
            tags:validatedTags,
            user:req.user._id
        })
        const saveBlog=await newBlog.save();
        res.json(saveBlog);
    }  catch (error) {
        console.error('Error saving blog:', error);
        return res.status(400).json({ error: error.message });
    }
    
});

// Route 2 -> Update a blog
router.post('/updateblog/:id', fetchuser, async (req, res) => {
    try {
        const { title, content, author, tags } = req.body; // Destructure the body
        const updatedBlog = {};

        // Add fields to be updated if they exist in the request
        if (title) updatedBlog.title = title;
        if (content) updatedBlog.content = content;
        if (author) updatedBlog.author = author;
        if (tags) updatedBlog.tags = tags;

        // Find the blog to be updated by its ID
        let blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Check if the logged-in user owns the blog
        if (blog.author.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not authorized to update this blog" });
        }

        // Update the blog
        blog = await Blog.findByIdAndUpdate(
            req.params.id,
            { $set: updatedBlog },
            { new: true } // Return the updated document
        );

        res.json({ blog });
    } catch (error) {
        console.error("Error details:", error);
        res.status(500).json({ error: error.message });
    }
    
});


//route-3 get all blogs
router.get('/getblogs',fetchuser, async(req, res) => {  ///wehnever user is at the auth endpoint, this will be returend
    try {
        const notes=await Blog.find({ });  //finding all the blogs
        if (!notes.length) {
            return res.status(404).json({ message: "No blogs found" });
        }
        res.json(notes);   //returning a json object as the response which conatains user notes
    } catch (error) {
        console.error(error.message); // Log the error for debugging
        res.status(500).send("Internal Server Error");
    }
    

});


module.exports=router;