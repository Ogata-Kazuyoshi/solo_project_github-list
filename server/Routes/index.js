const router = require('express').Router();

router.use('/dbinformation', require('./dbinformation'));
router.use('/auth', require('./tempAuth'));

module.exports = router;
