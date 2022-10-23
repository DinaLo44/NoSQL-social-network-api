const router = require('express').Router();
//Setting up the routes for users and thoughts
const users = require('./users');
const thoughts = require ('./thoughts');

router.use('/users', users);
router.use('/thoughts', thoughts);

module.exports = router;