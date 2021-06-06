const { Router } = require('express');
const router = Router();

const homeRoutes = require('./homePage');
const projectRoutes = require('./Projects');
const taskRoutes = require('./Tasks');

router.use('/', homeRoutes);
router.use('/projects', projectRoutes);
router.use('/tasks', taskRoutes);

module.exports = router;