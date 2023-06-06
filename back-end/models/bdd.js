const Sequelize = require('sequelize');


module.exports = new Sequelize('projet', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});