'use strict';
const mongoose    = require('mongoose');
const Schema      = mongoose.Schema;

let taskSchema = new Schema({
    taskName: { type: String }
});

module.exports = mongoose.model('Task', taskSchema);