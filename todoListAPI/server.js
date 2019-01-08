var express = require('express'), //create a server using express, which was installed using npm install express --save
  app = express(),
  port = process.env.PORT || 3000;

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);
