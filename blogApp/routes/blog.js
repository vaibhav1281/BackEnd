const express = require( 'express' );

const router = express.Router();

const { createPost, getAllPosts } = require('../controllers/postController')
const { dummyController } = require('../controllers/dummyController')
const { createComment } = require('../controllers/commentController');
const { likedPost, unlikedPost } = require('../controllers/likeController')

// router.post('/post', postController)

router.get('/dummyPage', dummyController);

router.post('/comments/create', createComment);

router.post('/posts/create', createPost)
router.get('/posts', getAllPosts)
router.post('/likes/like', likedPost)
router.post('/likes/unlike', unlikedPost)

module.exports = router;