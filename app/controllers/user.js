var User        = require('../models/user'); // get the mongoose model

exports.signUp = function(req, res) {
  if (!req.body.name || !req.body.password) {
    res.json({success: false, msg: 'Please pass name and password.'});
  } else {
    var newUser = new User({
    	local: {
    		name : req.body.name,
    		password : req.body.password
    	}
    });
    // save the user
    newUser.save(function(err) {	
      if (err) {
      	console.log(err);
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
};