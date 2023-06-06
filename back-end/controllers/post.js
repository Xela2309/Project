// importration de indispensables
const Post = require('../models/posts');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const multer = require('../middlewares/multer');
const e = require('express');


// Middleware POST
exports.newPost = (req, res) => {

    const userToken = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(userToken, 'CLEF_SECRETE');
    const userId = decodedToken.tokenUID;

    const post = new Post ({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        user_id: userId 
    });
    post.save()
        .then(() => {
            res.status(201).json({ message: 'post créé !' });
        })
        .catch((err) => { res.status(400).json({ message: 'post non créé' + err}) });
}

// Middleware GET All
exports.getPosts = (req, res) => {

    const userToken = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(userToken, 'CLEF_SECRETE');
    const userId = decodedToken.tokenUID;

    Post.findAll({ include: [{
        model: User,
        attributes: ['firstname', 'lastname', 'imageUrl', 'user_id']
      }] }) 
        .then((data) => {

            const newUserId = userId;

            const dataReverse = data.reverse();

            console.log(newUserId);

            User.findOne({ where: { user_id: newUserId } })
                .then((admin) => {
                    const isAdmin = admin.dataValues.isAdmin;
                    res.status(200).json({ data, userId, isAdmin });
                });
        })
        .catch((err) => console.log('il ya une erreur ' + err));
}

// Middleware GET ONE
exports.getLike = (req, res) => {

    const id = req.query.id;
    const encodedToken = req.query.token;
    const decodedToken = jwt.verify(encodedToken, 'CLEF_SECRETE');
    const userId = decodedToken.tokenUID;
    const userLike = `${userId}-`;

    Post.findOne({ where: { id: id }})
        .then((data) => {
            const liked = data.dataValues.usersLiked;
            if(liked.includes(userLike)) {
                const userLiked = true;
                res.status(200).json({ data, userLiked })
            } else {
                const userLiked = false
                res.status(200).json({ data, userLiked })
            }
        })
        .catch((err) => res.status(404).json({ message : 'erreur systeme like ' + err}))
}

// Middleware DELETE
exports.deletePost = (req, res) => {

    const postId = req.body.postId;
    console.log(postId);
    Post.destroy({ where: { id: postId }})
        .then(() => res.status(203).json({ message: 'Post correctement supprimer' }))
        .catch(() => res.status(500).json({ message: 'Post non supprimer' }));
}

// Middleware LIKE
exports.likePost = (req, res) => {

    const userToken = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(userToken, 'CLEF_SECRETE');
    const userId = decodedToken.tokenUID;
    const id = req.body.postId;
    const userLike = `${userId}-`;

    Post.findOne({ where: { id: id }})
        .then((data) => {
            const allLikes = data.dataValues.usersLiked;
            console.log(allLikes)
            if(allLikes == null) {

                Post.update({ usersLiked: userLike }, { where: { id: id }})
                    .then(() => {
                        res.status(203).json({ message: 'liked'})
                    })
                    .catch((err) => res.status(500).json({ message: 'disliked' + err}));

            } else {

                if(allLikes.includes(userLike)) {
                    const newString = allLikes.replace(userLike, '');
                    const totalLikes = newString.split('-').length;
                    const totalLikesAdjust = totalLikes - 1;
                    console.log(totalLikesAdjust);
                    
                    Post.update({ usersLiked: newString, likes: totalLikesAdjust }, { where: { id: id }})
                        .then(() => res.status(203).json({ message: 'disliked' }))
                        .catch((err) => res.status(500).json({ messgae: err}));
    
                } else {
                    const newString = allLikes.concat(userLike);
                    const totalLikes = newString.split('-').length;
                    const totalLikesAdjust = totalLikes - 1;
                    console.log(totalLikesAdjust);

                    Post.update({ usersLiked: newString, likes: totalLikesAdjust }, { where: { id: id }})
                        .then(() => {
                            res.status(203).json({ message: 'liked'})
                        })
                        .catch((err) => res.status(500).json({ message: 'disliked' + err}));
                }
            }
            
            

        })
        .catch((err) => res.status(500).json({ message: 'erreur findOne' + err}))
}