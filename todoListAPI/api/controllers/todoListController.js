'use strict'

var mongoose = require('mongoose'),
        Task = mongoose.model('Tasks'); // Task is now modeled after Tasks, which is of type TaskSchema


// Task.xxx() are functions from MongoDB 


// for /list
exports.list_all_tasks = function(request, response) {
        Task.find( {}, function(err, task) {
                if (err)
                        response.send(err);
                response.json(task);
        } );
};

exports.create_a_task = function(request, response) {
        var new_task = new Task(request.body); // /list receives a task from the user. The task's body is the value of the request
        new_task.save( function(err, task) {
                if (err)
                        response.send(err);
                response.json(task);
        } );
};


// for /list/:taskId
exports.read_a_task = function(request, response) {
        Task.findById( request.params.taskId, function(err, task) {
                if (err)
                        response.send(err);
                response.json(task);
        } );
};

exports.update_a_task = function(request, response) {
        Task.findOneAndUpdate( {_id: request.params.taskId}, request.body, {new:true}, function(err, task) {
                if (err)
                        response.send(err);
                response.json(task);
        } );
};

exports.delete_a_task = function (request, response) {
        Task.remove( {_id: request.params.taskId}, function(err, task) {
                if (err)
                        response.send(err);
                response.json( {message: 'Task successfully deleted'} );
        } );
};
