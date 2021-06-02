const { Router } = require('express');
const router = Router();

router.get('/', (req, res, next )=> {
  res.send('Hello world!');
});

router.get('/about', (req, res) => {
  res.send('About me');
});

module.exports = router;