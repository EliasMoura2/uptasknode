const router = require('express').Router();
const tasksCtrl = require('./../controllers/tasks');
const {isUserAuthenticated} = require('./../controllers/auth');

router.post('/new/:url', 
  isUserAuthenticated,
  tasksCtrl.addTask
);

router.patch('/update-state/:id', 
  isUserAuthenticated,  
  tasksCtrl.updateStateTask
);

router.delete('/delete/:id',
  isUserAuthenticated,
  tasksCtrl.deleteTask
  );

module.exports = router;