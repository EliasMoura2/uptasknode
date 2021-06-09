const {Router} = require('express');
const router = Router();
const homeCtrl = require('./../controllers');
const {isUserAuthenticated} = require('./../controllers/auth');

router.get('/',  isUserAuthenticated, homeCtrl.homePage);

module.exports = router;