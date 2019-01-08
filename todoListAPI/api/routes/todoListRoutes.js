'use strict';
module.exports = function(app) {
        var todoList = require('../controllers/todoListController'); // we require our controller so that each route
                                                                     // can call their handler functions 

        // todoList Routes
        app.route('/list') //       /list is a route
            .get(todoList.list_all_tasks) 
            .post(todoList.create_a_task);

        app.route('/list/:taskId') //       /list/:taskId is a route
            .get(todoList.read_a_task)
            .put(todoList.update_a_task)
            .delete(todoList.delete_a_task);
};
