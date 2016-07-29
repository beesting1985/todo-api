var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var _ = require('underscore');	

var PORT = process.env.PORT || 3000;
var users = [];
var userNextID = 1;

app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.send('Todo api root');
});

app.get('/users', function (req, res) {
	res.json(users);
})

app.get('/users/:id', function (req, res) {
	var userid = parseInt(req.params.id, 10);
	var matchedUser = _.findWhere(users, {id: userid});
	
	if (matchedUser) {
		res.json(matchedUser);

	} else {
		res.status(404).send();
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