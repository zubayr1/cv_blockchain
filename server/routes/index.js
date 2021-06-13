var express = require('express');
var router = express.Router();

var profService = require('../prof_service');

var uploadService = require('../upload_service')

router.get('/doc', function(req, res, next) {

  profService.get(req, res);

  
});


router.post('/prof', function(req, res, next) {
  profService.create(req, res);
})


router.get('/getupld', function(req, res, next) {

  uploadService.get(req, res);

  
});


router.post('/upld', function(req, res, next) {
  uploadService.create(req, res);
})


module.exports = router;
