// Importation des indispensables
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRoute = require('./route/user');
const postsRoute = require('./route/post');
const path = require('path');
const Sequelize = require('./models/bdd');
const Post = require('./models/posts');
const User = require('./models/user');

// autorisation de toutes du CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Ajout du bodyParser
app.use(bodyParser.json());

// Ajout des différentes routes
app.use('', userRoute);
app.use('', postsRoute);

// configuration vers le dossier image
app.use('/images', express.static(path.join(__dirname, 'images')));

// sequelize
Sequelize.sync({ alter: true });


// Exportation de app
module.exports = app;