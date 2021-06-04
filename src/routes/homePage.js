const {Router} = require('express');
const router = Router();
const homeCtrl = require('./../controllers');

router.get('/', homeCtrl.homePage);

module.exports = router;