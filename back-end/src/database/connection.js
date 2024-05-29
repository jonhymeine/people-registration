const {Sequelize} = require('sequelize');

require('dotenv').config();
const {DATABASE_USER, DATABASE_USER_PASSWORD, DATABASE_PORT, DATABASE_HOST, DATABASE_NAME, DATABASE_SCHEMA} =
    process.env;
const databaseUri = `postgres://${DATABASE_USER}:${DATABASE_USER_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}?schema=${DATABASE_SCHEMA}`;

const sequelize = new Sequelize(databaseUri);

module.exports = sequelize;
