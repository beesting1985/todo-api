var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todo = [{
	 id: 1,
	 description: 'Go to grocery',
	 completed: false
}, {
	id: 2,
	description: 'go to school',
	completed: false
}, {
	id: 3,
	description: 'bike repair',
	completed: true
}];

app.get('/', function (req, res) {
	res.send('Todo api root');
});

app.get('/todos', function (req, res) {
	res.json(todo);
})

app.get('/todos/:id', function (req, res) {
	var todoid = parseInt(req.params.id, 10);
	var check;
	todo.forEach(function (todo) {
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

app.listen(PORT, function () {
	console.log('express listening on port ' + PORT +'!');
});