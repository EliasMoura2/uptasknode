const { Router } = require('express');
const router = Router();

const homeRoutes = require('./homePage');
const projectRoutes = require('./Projects');

router.use('/', homeRoutes);
router.use('/projects', projectRoutes);

module.exports = router;