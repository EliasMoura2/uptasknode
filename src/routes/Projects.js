const router = require('express').Router();
const { body } = require('express-validator');
const projectsCtrl = require('./../controllers/projects');
const taskCtrl = require('./../controllers/tasks');

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

router.patch('/:url/tasks/:id', projectsCtrl.updateStateTask);

router.post('/:url', taskCtrl.addTask);

module.exports = router;