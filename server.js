var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var _ = require('underscore');
var logger = require('morgan');	

var PORT = process.env.PORT || 3000;
var users = [];
var userNextID = 1;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/users', function (req, res) {
	res.send(users);
});

app.get('/users/:mobile', function (req, res) {
	var todomobile = parseInt(req.params.mobile, 10);
	var matcheduser = _.findWhere(users, {mobile: todomobile});
	// console.log(users[1]);
	if (!matcheduser) {
	// console.log(matcheduser);
	res.json({"msg": false}); //0: false
	} else {
	// console.log(matcheduser);
	res.json({"msg": true});	
	}
});

app.post('/users/find', function (req, res) {
	var userMobile = req.body.mobil;

	var matchedUser = _.findWhere(users, {mobil: userMobile});
	// var mobile = _.pick
	console.log('request find');
	// var matchedUser = null;
	
	if (matchedUser) {
		res.json(matchedUser);
		// res.send('false');

	} else {
		
		//send OTP
		//Store Mobile & OTP
		res.json({mobil: null});

	}
}); 

//POST 
app.post('/users', function (req, res) {
	
	var body = _.pick(req.body, 'mobile', 'gender');
	// if (!_.isEmpty(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
	// 	return res.status(400).send();
	// }


	// body.description = body.description.trim();
	body.id = userNextID++;

	users.push(body);
//	console.log('description: ' + body.description);
	res.json(body);
});

//DELETE
// app.delete('/todos/:id', function (req, res) {
// 	var todoid = parseInt(req.params.id, 10);
// 	var matchedTodo = _.findWhere(todos, {id: todoid});


// 	if (!matchedTodo) {
// 		res.status(404).json({"error": "NO itenm found"});

// 	} else {
// 		todos = _.without(todos, matchedTodo);
// 		res.json(matchedTodo);
// 	}

// });

// app.put('/todos/:id', function (req, res){
// 	var todoid = parseInt(req.params.id, 10);
// 	var matchedTodo = _.findWhere(todos, {id: todoid});
// 	var body = _.pick(req.body, 'description', 'completed');
// 	var validAttributes = {};

// 	if (!matchedTodo) {
// 		res.status(404).send;
// 	}
// 	if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
// 		validAttributes.completed = body.completed;
// 	}
// 	else if (body.hasOwnProperty('completed')){
// 		return res.status(400).send;
// 	}

// 	if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length >0) {
// 		validAttributes.description = body.description;
// 	}
// 	else if (body.hasOwnProperty('description')) {
// 		return res.status(400).send;
// 	}

// 	_.extend(matchedTodo, validAttributes);
// 	res.json(matchedTodo);

// });


app.listen(PORT, function () {
	console.log('express listening on port ' + PORT +'!');
});