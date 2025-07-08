const Post = require('../models/postModel');

exports.getAllPosts = async(req, res) => {
    try {
        const posts = await Post.find({})
            .populate('author', 'username name') // ✅ populate author fields
            .sort({ createdAt: -1 });

        res.status(200).json({
            status: 'success',
            data: { posts }
        });
    } catch (err) {
        console.error('Error loading posts:', err);
        res.status(500).json({
            status: 'error',
            message: 'Failed to load posts'
        });
    }
};