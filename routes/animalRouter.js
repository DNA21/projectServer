const express= require('express');
const animalRouter = express.Router();

animalRouter.route('/')
.get((req, res, next) => {
    res.end('Will send all the animals to you');
})
.post((req, res, next) => {
    res.end(`Will add the animal: ${req.body.name} with description:
    ${req.body.description}`);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not suppored on /animals');
})
.delete((req, res, next) => {
    res.end('Deleting all Animals');
});

animalRouter.route('/:animalId')
.get((req, res, next) => {
    res.statusCode = 200;
    res.end(`Will send details of the animal: ${req.params.animalId} to you`);
})
.post((req, res, next) => {
    res.statusCode = 403
    res.end(`POST operation not suppored on /animals/${req.params.animalId}`);
})
.put((req, res, next) => {
    res.write(`Updating the animal: ${req.params.animalId}\n`);
    res.end(`Will update the animal: ${req.body.name}
        with description: ${req.body.description}`)
})
.delete((req, res, next) => {
    res.end(`Deleting animal: ${req.params.animalId}`);
});

module.exports = animalRouter;
