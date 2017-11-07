const express = require('express');
const router = express.Router();
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../tweetBank');

router.get('/', function (req, res) {
  let tweets = tweetBank.list();
  res.render( 'index', { tweets: tweets } );
});

router.get('/users/:name', function(req, res) {
  var name = req.params.name;
  var tweets = tweetBank.find( {name: name} );
  res.render( 'index', { tweets: tweets });
});

router.get('/tweets/:id', function(req, res){
	var id = req.params.id;
	id = parseInt(id);
	var singleTweet = tweetBank.find({id: id});
	res.render('index', {singleTweet: singleTweet});
});

module.exports = router;