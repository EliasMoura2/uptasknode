const {Router} = require('express');
const router = Router();

const homeRoutes = require('./homePage');
const projectRoutes = require('./Projects');
const taskRoutes = require('./Tasks');
const authRoutes = require('./Auth');
const userRoutes = require('./Users');

router.use('/', homeRoutes);
router.use('/projects', projectRoutes);
router.use('/tasks', taskRoutes);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);

module.exports = router;