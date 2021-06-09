const router = require('express').Router();
const authCtrl  = require('./../controllers/auth');

router.get('/register', authCtrl.getFormRegister);
router.post('/register', authCtrl.postFormRegister);
router.get('/login', authCtrl.getFormLogin);
router.post('/login', authCtrl.authenticateUser);
router.get('/exit', authCtrl.closeSession)

module.exports = router;