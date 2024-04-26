const express = require( 'express' );

const router = express.Router();

const { postController } = require('../controllers/postController')
const { dummyController } = require('../controllers/dummyController')
const { createComment } = require('../controllers/commentController');

// router.post('/post', postController)

router.get('/dummyPage', dummyController);

router.post('/comments/create', createComment);

module.exports = router;