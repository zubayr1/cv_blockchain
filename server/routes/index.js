var express = require('express');
var router = express.Router();

var profService = require('../prof_service');

router.get('/doc', function(req, res, next) {

  profService.get(req, res);

  
});


router.post('/prof', function(req, res, next) {
  profService.create(req, res);
})


module.exports = router;
