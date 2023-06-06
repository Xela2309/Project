const express = require('express');
const router = express.Router();
const postControl = require('../controllers/post');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer');


// route création d'un nouveau post
router.post('/posts', auth, postControl.newPost)
// route récupération de tous les posts
router.get('/posts', auth, postControl.getPosts)
// route de récupération 1 post
router.get('/post', postControl.getLike)
// route de supression
router.delete('/posts', postControl.deletePost);
// route like
router.put('/posts', postControl.likePost);

module.exports = router;