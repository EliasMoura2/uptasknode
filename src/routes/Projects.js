const router = require('express').Router();
const { body } = require('express-validator');
const projectsCtrl = require('./../controllers/projects');

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

router.delete('/delete/:url', projectsCtrl.deleteProject);

module.exports = router;