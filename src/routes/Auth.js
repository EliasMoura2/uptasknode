const router = require('express').Router();
const authCtrl  = require('./../controllers/auth');

// crear cuenta
router.get('/register', authCtrl.getFormRegister);
router.post('/register', authCtrl.postFormRegister);
//confirmar cuenta
router.get('/confirm/:email', authCtrl.confirmAccount)
// login
router.get('/login', authCtrl.getFormLogin);
router.post('/login', authCtrl.authenticateUser);
// cerrar sesion
router.get('/exit', authCtrl.closeSession);
// reset password
router.post('/reset', authCtrl.sendToken);
router.get('/reset/:token', authCtrl.validTokenPassword);
router.post('/reset/:token', authCtrl.updatePassword);

module.exports = router;