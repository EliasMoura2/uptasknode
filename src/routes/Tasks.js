const router = require('express').Router();
const projectsCtrl = require('./../controllers/projects');

router.get('/show/:url', projectsCtrl.getProjectUrl);

module.exports = router;