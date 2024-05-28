const sequelize = require('../connection.js');
const {DataTypes} = require('sequelize');

const Person = sequelize.define('Person', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    rg: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    birthdate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    gender: {
        type: DataTypes.CHAR(1),
        allowNull: false,
    },
});

module.exports = Person;
