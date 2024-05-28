const express = require('express');
const {Op} = require('sequelize');
const sequelize = require('../database/index');
const Person = require('../database/models/PersonModel');

class PeopleController {
    /**
     * @param {express.Request} req
     * @param {express.Response} res
     *
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

            Person.create({name, cpf, rg, birthdate, gender});
            res.status(201).send('Person created');
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        }
    }

    /**
     * @param {express.Request} req
     * @param {express.Response} res
     */
    async getPerson(req, res) {
        const searchMethod = req.body.searchMethod;
        try {
            if (searchMethod === 'cpf') {
                const cpf = req.body.cpf;
                const person = await Person.findOne({where: {[Op.startsWith]: cpf}});

                if (!person) {
                    return res.status(404).send('Person not found');
                }
                res.json(person);
            } else if (searchMethod === 'name') {
                const name = req.body.name;
                const person = await Person.findAll({where: {[Op.substring]: name}});

                if (!person) {
                    return res.status(404).send('Person not found');
                }
                res.json(person);
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        }
    }

    /**
     * @param {express.Request} req
     * @param {express.Response} res
     */
    async getPeople(req, res) {
        try {
            const people = await Person.findAll();
            if (people.length === 0) {
                return res.status(404).send('No people found');
            }
            res.json(people);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        }
    }

    /**
     * @param {express.Request} req
     * @param {express.Response} res
     */
    async updatePerson(req, res) {
        const id = req.params.id;
        const name = req.body.name;
        const cpf = req.body.cpf;
        const rg = req.body.rg;
        const birthdate = req.body.birthdate;
        const gender = req.body.gender;
        try {
            const person = await Person.findByPk(id);
            if (!person) {
                return res.status(404).send('Person not found');
            }

            if (cpf && cpf !== person.cpf) {
                let confictingPerson = await Person.findOne({where: {cpf}});
                if (confictingPerson) {
                    return res.status(409).send('Person with this CPF already exists');
                }
            }

            if (rg && rg !== person.rg) {
                confictingPerson = await Person.findOne({where: {rg}});
                if (confictingPerson) {
                    return res.status(409).send('Person with this RG already exists');
                }
            }

            const updatedInfo = {};
            if (name) updatedInfo.name = name;
            if (cpf) updatedInfo.cpf = cpf;
            if (rg) updatedInfo.rg = rg;
            if (birthdate) updatedInfo.birthdate = birthdate;
            if (gender) updatedInfo.gender = gender;

            person.update(updatedInfo);

            res.send('Person updated');
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        }
    }
}

module.exports = PeopleController;
