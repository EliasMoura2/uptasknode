const router = require('express').Router();
const tasksCtrl = require('./../controllers/tasks');


router.post('/new/:url', tasksCtrl.addTask);
router.patch('/update-state/:id', tasksCtrl.updateStateTask);
router.delete('/delete/:id', tasksCtrl.deleteTask);

module.exports = router;