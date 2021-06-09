const router = require('express').Router();
const {body} = require('express-validator');
const projectsCtrl = require('./../controllers/projects');
const {isUserAuthenticated} = require('./../controllers/auth');

router.get('/show/:url',
  isUserAuthenticated,
  projectsCtrl.getProjectUrl
);

router.get('/new', 
  isUserAuthenticated,
  projectsCtrl.getNewProject
);

router.post('/new', 
  isUserAuthenticated,
  body('name')
    .notEmpty().withMessage("name can't be empty")
    .trim()
    .escape(),
  projectsCtrl.postNewProject
);

router.get('/edit/:id', 
  isUserAuthenticated, 
  projectsCtrl.getUpdateProject
);

router.post('/edit/:id',
  isUserAuthenticated,
  projectsCtrl.putUpdateProject
);

router.delete('/delete/:url', 
  isUserAuthenticated, 
  projectsCtrl.deleteProject
);

module.exports = router;