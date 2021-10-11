const express     = require('express');
const ejs         = require('ejs');
const bodyParser  = require('body-parser');
const routs       = require('./routs/index');
const mongoose    = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/todo-app-db', {useMongoClient: true}, (err) => {
  if(err) {
    console.log('Not connected to database !!! -> ' + err);
  } else {
    console.log('Connected to database successfully ...')
  }
});

let urlencodedParser = bodyParser.urlencoded({ extended: false });

// Setting view engine
app.set('view engine', 'ejs');

// Routs
app.get('/', routs.home);
app.post('/tasks', urlencodedParser, routs.sendData);
app.delete('/delete/:id', routs.deleteData);

// Setting public for static files
app.use(express.static(__dirname + '/public/'));

// 404 Middleware
app.use(routs.notFound);

// Setting up port
app.listen(port, () => {
  console.log("APP is listening on port " + port);
});
