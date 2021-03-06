const express= require('express');
const bodyParser= require('body-parser');
const app= express();
app.use(bodyParser.json());
const path= require('path');

const db= require("./db");
const collection= "todo";

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/getTodos', (req, res) => {
	db.getDB().collection(collection).find({}).toArray((err, documents) => {
		if (err)
			console.log(err);
		else
		{
			console.log(documents);
			res.json(documents);
		}
	});
});

app.put('/:id', (req, res) => {
	const todoID= req.params.id;
	const userInput= req.body;
	db.getDB().collection(collection).findOneAndUpdate({_id : todoID}, {$set: {todo : userInput.todo}, {returnOriginal : false}}, (err, result)  => {
		if (err)
			console.log(err);
		else
		{
			res.json(result);
		}
}));

db.connect((err) => {
	if (err)
	{
		console.log('Unable to connect to database. Error: ' + err);
		process.exit(1);
	}
	else
	{
		app.listen(3000, () => {
			console.log('Connected to database, app listening on port 3000');
		});
	}
});