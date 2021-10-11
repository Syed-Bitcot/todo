const mongoose    = require('mongoose');
const Task        = require('../models/task');
mongoose.Promise  = global.Promise;

// Drops database task collection before each run
let db = mongoose.connection;
db.collections.tasks.drop();

// Home
let home =  (req, res) => {
    // Get values of taskName keys
    // Task.distinct('taskName', (err, data) => {
    Task.find({}, (err, data) => {
        if(err) {
            console.log("Can not read data from database !!! -> " + err)
        } else {
            console.log("Read data from database successfully ...");
            res.render('home', { tasks: data });
        }
    });
};

// Send data from home page to database
let sendData = (req,res) => {
    let task = new Task();
    task.taskName = req.body.task;

    task.save( (err) => {
        if(err) {
            console.log("Item didn't save !!! -> " + err);
        } else {
            console.log("Item saved successfully ...");
            res.redirect('/');
        }
    });
};

// Delete data from database
let deleteData = (req, res) => {
    let query = { _id: req.params.id };

    Task.remove(query, (err) => {
        if(err) {
            console.log("Did not delete data !!! -> " + err);
        } else {
            console.log("Deleted data successfully ...");
            res.send('success');
        }
    })
}

// 404
let notFound = (req, res, next) => {
    res.status(404);
    res.render('404');
};


module.exports= {
    home,
    sendData,
    deleteData,
    notFound,
};