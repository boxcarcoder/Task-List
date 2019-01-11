var express = require('express'), //create a server using express, which was installed using npm install express --save
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Task = require('./api/models/todoListModel'), // load our schema/model
    bodyParser = require('body-parser'); // required to handle HTTP POST requests in Express.js Version 4 and up
    


// add a url to the mongoose instance connection to connect the DB 
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb');

// to allow CORS
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);

app.use( bodyParser.urlencoded({ extended: true }) );
app.use(bodyParser.json());


var routes = require('./api/routes/todoListRoutes'); // import our routes
routes(app); // register the route


app.listen(port);

console.log('my todo list RESTful API server started on: ' + port);

app.use(function(req, res) {
        res.status(404).send({url: req.originalUrl + ' not found'})
});


