const {Router} = require('express');
const router = Router();
const homeCtrl = require('./../controllers');

router.get('/', homeCtrl.homePage);
router.get('/about', homeCtrl.aboutMe);

module.exports = router;