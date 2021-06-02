const router = require('express').Router();
const projectsCtrl = require('./../controllers/projects');
const {postValidationRules, validate} = require('./../middlewares/projectValidation');
router.get('/', projectsCtrl.getNewProject);
router.post('/', projectsCtrl.postNewProject);

module.exports = router;