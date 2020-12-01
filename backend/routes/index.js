var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/home', function(req, res, next) {
	res.redirect('index.html');
});
router.get('/aboutus', function(req, res, next) {
	res.redirect('index.html');
});
router.get('/menu', function(req, res, next) {
	res.redirect('index.html');
});
router.get('/menu/:id', function(req, res, next) {
	res.redirect('/index.html');
});
router.get('/favorite', function(req, res, next) {
	res.redirect('index.html');
});
router.get('/contactus', function(req, res, next) {
	res.redirect('index.html');
});
router.get('/carts', function(req, res, next) {
	res.redirect('index.html');
});
router.get('/payments', function(req, res, next) {
	res.redirect('index.html');
});

module.exports = router;
