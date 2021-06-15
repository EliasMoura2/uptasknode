const router = require('express').Router();
const authCtrl  = require('./../controllers/auth');


router.get('/register', authCtrl.getFormRegister);
router.post('/register', authCtrl.postFormRegister);

router.get('/confirm/:email', authCtrl.confirmAccount)

router.get('/login', authCtrl.getFormLogin);
router.post('/login', authCtrl.authenticateUser);

router.get('/exit', authCtrl.closeSession);

router.post('/reset', authCtrl.sendToken);
router.get('/reset/:token', authCtrl.validTokenPassword);
router.post('/reset/:token', authCtrl.updatePassword);

module.exports = router;