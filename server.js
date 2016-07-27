var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextID = 1;

app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.send('Todo api root');
});

app.get('/todos', function (req, res) {
	res.json(todos);
})

app.get('/todos/:id', function (req, res) {
	var todoid = parseInt(req.params.id, 10);
	var check;
	todos.forEach(function (todo) {
		if(todoid === todo.id) {
			check = todo;
		}
	});
	if (check) {
		res.json(check);

	} else {
		res.status(404).send();
	}
}); 

//POST 
app.post('/todos', function (req, res) {
	var body = req.body;
	body.id = todoNextID++;

	todos.push(body);



//	console.log('description: ' + body.description);
	res.json(body);
});

app.listen(PORT, function () {
	console.log('express listening on port ' + PORT +'!');
});