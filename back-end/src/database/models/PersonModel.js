const sequelize = require('../connection.js');
const {DataTypes} = require('sequelize');

const Person = sequelize.define(
    'Person',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        cpf: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
            },
        },
        rg: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
            },
        },
        birthdate: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        gender: {
            type: DataTypes.CHAR(1),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    },
    {
        timestamps: false,
    }
);

module.exports = Person;
