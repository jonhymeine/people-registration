const express = require('express');
const {Op, ValidationError} = require('sequelize');
const sequelize = require('../database/index');
const Person = require('../database/models/PersonModel');

class PeopleController {
    /**
     * Create a new person
     * @param {express.Request} req request
     * @param {express.Response} res response
     * @returns {Promise<void>}
     */
    async createPerson(req, res) {
        const {name, cpf, rg, birthdate, gender} = req.body;
        try {
            let person = await Person.findOne({where: {cpf}});
            if (person) {
                return res.status(409).send('Person with this CPF already exists');
            }

            person = await Person.findOne({where: {rg}});
            if (person) {
                return res.status(409).send('Person with this RG already exists');
            }

            person = await Person.create({name, cpf, rg, birthdate, gender});
            return res.status(201).json(person);
        } catch (error) {
            console.error(error);
            if (error instanceof ValidationError) {
                const validationError = error.errors[0];

                if (validationError.type === 'notNull Violation' || validationError.type === 'Validation error') {
                    if (validationError.path === 'name') {
                        return res.status(400).send('Invalid name');
                    }
                    if (validationError.path === 'cpf') {
                        return res.status(400).send('Invalid CPF');
                    }
                    if (validationError.path === 'rg') {
                        return res.status(400).send('Invalid RG');
                    }
                    if (validationError.path === 'birthdate') {
                        return res.status(400).send('Invalid birthdate');
                    }
                    if (validationError.path === 'gender') {
                        return res.status(400).send('Invalid gender');
                    }
                }
            }
            return res.status(500).send('Internal server error');
        }
    }

    /**
     * Get a person by name, CPF or RG
     * @param {express.Request} req request
     * @param {express.Response} res response
     * @returns {Promise<void>}
     */
    async getPeopleByFilter(req, res) {
        const searchMethod = req.params.searchMethod;
        const searchValue = req.params.searchValue;
        try {
            let person;
            if (searchMethod === 'name') {
                person = await Person.findAll({
                    where: {name: {[Op.iLike]: `%${searchValue}%`}},
                    order: [['name', 'ASC']],
                });
            } else if (searchMethod === 'cpf') {
                person = await Person.findAll({where: {cpf: {[Op.startsWith]: searchValue}}, order: [['cpf', 'ASC']]});
            } else if (searchMethod === 'rg') {
                person = await Person.findAll({where: {rg: {[Op.startsWith]: searchValue}}, order: [['rg', 'ASC']]});
            }
            if (!person) {
                return res.status(404).send('Person not found');
            }
            return res.json(person);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal server error');
        }
    }

    /**
     * Get all people
     * @param {express.Request} req request
     * @param {express.Response} res response
     * @returns {Promise<void>}
     */
    async getPeople(req, res) {
        try {
            const people = await Person.findAll({order: [['name', 'ASC']]});
            if (people.length === 0) {
                return res.status(404).send('No people found');
            }
            return res.json(people);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal server error');
        }
    }

    /**
     * Update a person by the id
     * @param {express.Request} req request
     * @param {express.Response} res response
     * @returns {Promise<void>}
     */
    async updatePerson(req, res) {
        const {id, name, cpf, rg, birthdate, gender} = req.body;
        try {
            const person = await Person.findByPk(id);
            if (!person) {
                return res.status(404).send('Person not found');
            }

            let conflictingPerson;
            if (cpf) {
                conflictingPerson = await Person.findOne({where: {cpf}});
                if (conflictingPerson && conflictingPerson.id !== id) {
                    return res.status(409).send('Person with this CPF already exists');
                }
            }
            if (rg) {
                conflictingPerson = await Person.findOne({where: {rg}});
                if (conflictingPerson && conflictingPerson.id !== id) {
                    return res.status(409).send('Person with this RG already exists');
                }
            }

            const updatedInfo = {};
            if (name && name !== person.name) updatedInfo.name = name;
            if (cpf !== person.cpf) updatedInfo.cpf = cpf;
            if (rg !== person.rg) updatedInfo.rg = rg;
            if (birthdate && birthdate !== person.birthdate) updatedInfo.birthdate = birthdate;
            if (gender && gender !== person.gender) updatedInfo.gender = gender;

            await person.update(updatedInfo);
            return res.send('Person updated');
        } catch (error) {
            console.error(error);
            if (error instanceof ValidationError) {
                const validationError = error.errors[0];

                if (validationError.type === 'Validation error' || validationError.type === 'notNull Violation') {
                    if (validationError.path === 'name') {
                        return res.status(400).send('Invalid name');
                    }
                    if (validationError.path === 'cpf') {
                        return res.status(400).send('Invalid CPF');
                    }
                    if (validationError.path === 'rg') {
                        return res.status(400).send('Invalid RG');
                    }
                    if (validationError.path === 'birthdate') {
                        return res.status(400).send('Invalid birthdate');
                    }
                    if (validationError.path === 'gender') {
                        return res.status(400).send('Invalid gender');
                    }
                }

                return res.status(400).send('Invalid data');
            }
            return res.status(500).send('Internal server error');
        }
    }

    /**
     * Delete a person by the id
     * @param {express.Request} req request
     * @param {express.Response} res response
     * @returns {Promise<void>}
     */
    async deletePerson(req, res) {
        const {id} = req.body;
        try {
            const person = await Person.findByPk(id);
            if (!person) {
                return res.status(404).send('Person not found');
            }

            await person.destroy();
            return res.send('Person deleted');
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal server error');
        }
    }
}

module.exports = PeopleController;
