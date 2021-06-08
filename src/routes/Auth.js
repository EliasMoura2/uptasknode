const router = require('express').Router();
const authCtrl  = require('./../controllers/auth');

router.get('/register', authCtrl.getRegister);
router.post('/register', authCtrl.postRegister);
router.get('/login', authCtrl.getLogin);

module.exports = router;