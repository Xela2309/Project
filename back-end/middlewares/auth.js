const jwt = require('jsonwebtoken');
const User = require('../models/user');


module.exports = (req, res, next) => {
    
    try {
        const userToken = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(userToken, 'CLEF_SECRETE');
        const userId = decodedToken.tokenUID;

        User.findOne({ where: { user_id: userId }})
            .then(() => {
                console.log('cet utilisateur a été authentifié');
                next();})
            .catch(() => console.log(`cet utilisateur n'existe pas`));
    } catch (err) {
        res.status(401).json({ error: err | 'Requête non authentifiée'});
    }
}