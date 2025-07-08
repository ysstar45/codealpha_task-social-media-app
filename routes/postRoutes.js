const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, postController.createPost);
router.get('/', postController.getAllPosts); // ✅ Allow loading posts
router.get('/user/:id', protect, postController.getUserPosts);

module.exports = router;