const express= require('express');
const Animal = require('../models/animal');
const authenticate = require('../authenticate');

const animalRouter = express.Router();

animalRouter.route('/')
.get((req, res, next) => {
    Animal.find()
    .then(animals => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(animals);
    })
    .catch(err => next(err));
})
.post(authenticate.verifyUser, (req, res, next) => {
    Animal.create(req.body)
    .then(animal => {
        console.log('Animal Created ', animal);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(animal);
    })
    .catch(err => next(err))
})
.put(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not suppored on /animals');
})
.delete(authenticate.verifyUser, (req, res, next) => {
    Animal.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

animalRouter.route('/:animalId')
.get((req, res, next) => {
    Animal.findById(req.params.animalId)
    .then(animal => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(animal);
    })
    .catch(err => next(err));
})
.post(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403
    res.end(`POST operation not suppored on /animals/${req.params.animalId}`);
})
.put(authenticate.verifyUser, (req, res, next) => {
    Animal.findByIdAndUpdate(req.params.animalId, {
        $set: req.body
    }, { new: true })
    .then(animal => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(animal);
    })
    .catch(err => next(err))
})
.delete(authenticate.verifyUser, (req, res, next) => {
    Animal.findByIdAndDelete(req.params.animalId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err))
});

module.exports = animalRouter;
