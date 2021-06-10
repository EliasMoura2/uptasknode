const router = require('express').Router();
const userCtrl  = require('./../controllers/users');

router.get('/reset', userCtrl.getResetPassword);

module.exports = router;