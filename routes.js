const router = require('express').Router();
const dataStore = require('./datastore');
const utils = require('./utils');

router.get('/entries', (_, res) => {
    res.status(200).send(dataStore.getAll());
});

router.get('/entries/:id', (req, res) => {
    const id = req.params.id;
    const data = dataStore.get(id);

    res.status(200).send(data);
});

router.post('/entry', (req, res) => {
    const data = req.body;
    const id = utils.getUniqueId();

    dataStore.put(id, data);
    res.status(200).send({id});
});

module.exports = router;