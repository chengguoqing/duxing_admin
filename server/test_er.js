var express = require('express');
var router = express.Router();

router.get('/test_e', function (req, res, next) {
 
        res.json({name:"陈国强"})

})

module.exports = router;