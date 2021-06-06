const router = require('express').Router();
const authCtrl  = require('./../controllers/auth');

router.get('/register', authCtrl.getRegister)

module.exports = router;