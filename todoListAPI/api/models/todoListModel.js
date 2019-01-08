'use strict';
var mongoose = require('mongoose') //mongoose makes it easier to interact with mongoDB
var Schema = mongoose.Schema; 

var TaskSchema = new Schema ({ //the model of a task in the server

        name: {
                type: String,
                required: 'What needs to be done?'
        },
        Created_date: {
                type: Date,
                default: Date.now
        },
        status: {
                type: [{
                        type: String,
                        enum: ['pending', 'ongoing', 'completed']
                }],
                default: ['pending']
        }
});

module.exports = mongoose.model('Tasks', TaskSchema); // Tasks becomes an object of type TaskSchema. Used in our controller
