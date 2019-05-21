const express = require('express');
const passport = require('passport');

const router = express.Router();

const path = process.cwd();
const Users = require(`${path}/models/users.js`);

router.post('/', async function(req, res, next) {
    try {
        const { body } = req;
        await Users.createUser(body);
        res.status(200).send('User is created successfully!');
    } catch (err) {
        next(err);
    }

})

router.get('/', async function(req, res) {
    res.status(200).json(await Users.getAllUsers());
})

router.get('/:username', async function(req, res, next) {
    try {
        const { username } = req.params;
        res.status(200).json(await Users.getUser(username));
    } catch (err) {
        next(err);
    }
})

router.post('/login', async function(req, res, next) {
    try {
        const { body } = req;
        const data = await Users.login(body.email, body.password);
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
})

module.exports = router;
