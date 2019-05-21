const express = require('express');
const passport = require('passport');

const router = express.Router();

const path = process.cwd();
const Organizations = require(`${path}/models/organizations.js`);
const Employees = require(`${path}/models/employees.js`);


router.post('/add', passport.authenticate('jwt', { session: false }), async function(req, res, next) {
    try {
        const { body } = req;
        const data = await Organizations.addNewOrg(body, req.user._id);
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
})

router.post('/addCollaborator', passport.authenticate('jwt', { session: false }), async function(req, res, next) {
    try {
        const { body } = req;
        const data = await Employees.addNewEmployee(body);
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
})

router.get('/:id', passport.authenticate('jwt', { session: false }), async function(req, res, next) {
    try {
        res.status(200).json(await Organizations.getOrganizationData(req.params.id));
    } catch (err) {
        next(err);
    }
})

router.get('/', passport.authenticate('jwt', { session: false }), async function(req, res, next) {
    try {
        res.status(200).json(await Organizations.getAllOrganizations(req.user._id));
    } catch (err) {
        next(err);
    }
})



module.exports = router;
