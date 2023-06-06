const express = require('express');
const router = express.Router();
const userControl = require('../controllers/user');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer');


// route d'inscription
router.post('/inscription', userControl.singUp);
// route de connexion
router.post('/connexion', userControl.login);
// route de récupération du user
router.get('/profils', auth, userControl.getUser);
// route de modification user
router.put('/profils', userControl.updateUser);
// route de supression de compte
router.delete('/profils', auth, userControl.deleteUser);


module.exports = router;