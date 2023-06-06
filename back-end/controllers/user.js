// importration de indispensables
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const multer = require('../middlewares/multer');
const { fstat } = require('fs');
const fs = require('fs');



// $$$$$$$$$$$$$$$$$$$$$$$$$ INSCRIPTION ET CONNEXION $$$$$$$$$$$$$$$$$$$
// Middleware d'inscription
exports.singUp = (req, res, next) => {

    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                firstname: req.body.firstname,
                lastname: req.body.name,
                birth: req.body.birth,
                sexe: req.body.sexe,
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'utilisateur créé !' }))
                .catch((error) => res.status(409).json({ message: 'Cette adresse email est déjà utilisée ' + error }));
        })
        .catch((err) => res.status(500).json({ message: 'Erreur serveur' + err }));

}

// Middleware de connexion
exports.login = (req, res, next) => {

    User.findOne({ where: { email: req.body.email } })
        .then((user) => {
            let mdp = user.dataValues.password;
            const UID = user.dataValues.user_id;
            const waitingTime = user.dataValues.waitingTime;
            const mistakes = user.dataValues.mistakes;
            console.log('mistakes' + mistakes);
            console.log('wait' + waitingTime);

            // developpement du test du date now
            if (waitingTime > Date.now()) {
                res.status(401).json({ message: 'Rien ne sert de spammer, vous devez attendre 1 minute !' });
                console.log('il faut attendre');
            } else {

                if (mistakes > 3) {
                    // ******************bloquage du compte*******************************
                    const newWating = Date.now() + 30000;
                    console.log(newWating);
                    User.update({ waitingTime: newWating, mistakes: 0 }, { where: { email: req.body.email } })
                        .then(() => {
                            res.status(401).json({ message: 'Compte bloqué pour 1 minute' })
                            console.log('compte bloqué pour 1 minute')
                        })
                        .catch((err) => res.status(500).json({ message: 'niveau mistakes ' + err}));

                } else {
                    // si tous les test sont bons
                    bcrypt.compare(req.body.password, mdp)
                        .then((password) => {
                            if (password) {
                                User.update({ mistakes: 0 }, { where: { email: req.body.email } })
                                    .then(() => {
                                        res.status(200).json({
                                            token: jwt.sign(
                                                { tokenUID: user.user_id },
                                                'CLEF_SECRETE',
                                                { expiresIn: '1h' }
                                            )
                                        });
                                    })
                                    .catch((err) => res.status(500).json({ message: err }));
                                
                            } else {
                                // incrémentation de mistakes
                                User.update({ mistakes: mistakes + 1 }, { where: { email: req.body.email } })
                                    .then(() => {
                                        res.status(400).json({ message : 'mot de passe incorrect'});
                                    })
                                    .catch((err) => res.status(500).json({ message: err}));
                            }
                        })
                        .catch((err) => res.status(500).json({ message: 'Erreur serveur' }));

                }
            }




        })
        .catch((err) => res.status(404).json({ message: 'cette adresse email est introuvable' }))
}
// $$$$$$$$$$$$$$$$$$$$$$$$ FIN INSCRIPTION ET CONNEXION $$$$$$$$$$$$$$$$$

// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ RECUPERATION/MODIF/DELETE USER $$$$$$$$$$$$$$$$$$$$$$$$$$$
// Middleware GET
exports.getUser = (req, res, next) => {

    const userToken = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(userToken, 'CLEF_SECRETE');
    const userId = decodedToken.tokenUID;

    User.findOne({ where: { user_id: userId } })
        .then((data) => {
            res.status(200).json(data.dataValues);
        })
        .catch((err) => res.status(404).json({ message: 'utilisateur introuvable ! ' + err }));
}

// Middleware PUT
exports.updateUser = (req, res) => {

    const userToken = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(userToken, 'CLEF_SECRETE');
    const userId = decodedToken.tokenUID;

    User.update(
        {
            bio: req.body.bio,
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            sexe: req.body.sexe,
            birth: req.body.birth,
            imageUrl: req.body.imageUrl
        },
        { where: { user_id: userId } })
        .then(() => {
            res.status(200).json({ message: 'les modifications ont bien été enregistrées' });
        })
        .catch((err) => res.status(500).json({ message: 'erreur 500 lors de la modification ' + err }));

}

// middleware DELETE 
exports.deleteUser = (req, res) => {

    const userToken = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(userToken, 'CLEF_SECRETE');
    const userId = decodedToken.tokenUID;

    User.destroy({ where: { user_id: userId } })
        .then(() => res.status(203).json({ message: 'votre compte a correctement été suprimé' }))
        .catch((err) => res.status(500).json({ message: err }));
}


