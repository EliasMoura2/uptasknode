const router = require('express').Router();
const projectsCtrl = require('./../controllers/projects');
const { body } = require('express-validator');

router.get('/', projectsCtrl.getNewProject);

router.post('/', 
  body('name')
    .notEmpty().withMessage("name can't be empty")
    .trim()
    .escape(),
  projectsCtrl.postNewProject
);

module.exports = router;