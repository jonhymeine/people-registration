const express = require('express');
const router = express.Router();

const PeopleController = require('../controllers/PeopleController');
const peopleController = new PeopleController();

router.get('/people', (req, res) => peopleController.getPeople(req, res));
router.get('/person', (req, res) => peopleController.getPerson(req, res));
router.post('/person', (req, res) => peopleController.createPerson(req, res));
router.put('/person', (req, res) => peopleController.updatePerson(req, res));
router.delete('/person', (req, res) => peopleController.deletePerson(req, res));

module.exports = router;
