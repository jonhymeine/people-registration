const express = require('express');
const router = express.Router();

const PeopleController = require('../controllers/PeopleController');
const peopleController = new PeopleController();

router.post('/', (req, res) => peopleController.createPerson(req, res));

router.get('/', (req, res) => peopleController.getPeople(req, res));

router.get('/:id', (req, res) => {
    res.send('GET /people/:id');
});

router.put('/:id', (req, res) => peopleController.updatePerson(req, res));

router.delete('/:id', (req, res) => {
    res.send('DELETE /people/:id');
});

module.exports = router;
