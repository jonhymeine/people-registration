const fs = require('fs');
require('dotenv').config();

const sequelize = require('./connection.js');
const Person = require('./models/PersonModel.js');

const autoFillDatabase = process.env.AUTO_FILL_DATABASE === 'true';

sequelize.sync({alter: true, logging: false});

const fillDatabase = async () => {
    const people = JSON.parse(fs.readFileSync('./src/database/people.json', 'utf-8')).people;
    for (const person of people) {
        const conflictingPerson = await Person.findOne({where: {cpf: person.cpf}});
        if (conflictingPerson) {
            continue;
        }
        Person.create(person);
    }
};

if (autoFillDatabase) {
    fillDatabase();
}

module.exports = sequelize;
