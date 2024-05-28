const sequelize = require('./connection.js');
const Person = require('./models/PersonModel.js');

sequelize.sync({alter: true, logging: false});

module.exports = sequelize;
