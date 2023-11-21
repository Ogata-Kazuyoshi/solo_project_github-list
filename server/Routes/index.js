const router = require('express').Router();

router.use('/dbinformation', require('./dbinformation'));

module.exports = router;
