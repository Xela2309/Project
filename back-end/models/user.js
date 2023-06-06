const { DATE } = require('sequelize');
const { Sequelize, DataTypes } = require('sequelize');
// const Post = require('./posts');
const db = require('./bdd');

const User = db.define('users', {
    user_id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    lastname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    firstname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    birth: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sexe: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
        allowNull: false
    },
    mistakes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    bio: {
        type: Sequelize.STRING
    },
    imageUrl: {
        type: Sequelize.TEXT('long'),
        defaultValue: null
    },
    waitingTime: {
        type: Sequelize.STRING,
        defaultValue: 0
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
});

// User.associate = (models) => {
//     // associations can be defined here
//     User.hasOne(models.Post, { onDelete: 'cascade' });
// };

// User.hasMany(Post, { onDelete: 'cascade' });

// Post.belongsTo(User, { foreignKey: 'user_id' });

// User.hasMany(Post, { onDelete: 'cascade' });


module.exports = User;