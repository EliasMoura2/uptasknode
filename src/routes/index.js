const { Router } = require('express');
const router = Router();

const homeRoutes = require('./homePage');

router.get('/', homeRoutes);

module.exports = router;