const router = require('express').Router();
const projectsCtrl = require('./../controllers/projects');
const { body } = require('express-validator');

router.get('/show/:url', projectsCtrl.getProjectUrl);

router.get('/new', projectsCtrl.getNewProject);
router.post('/new', 
  body('name')
    .notEmpty().withMessage("name can't be empty")
    .trim()
    .escape(),
  projectsCtrl.postNewProject
);

router.get('/edit/:id', projectsCtrl.getUpdateProject)
router.post('/edit/:id', projectsCtrl.putUpdateProject);

module.exports = router;