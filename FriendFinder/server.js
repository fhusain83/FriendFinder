var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');


var app = express();


var PORT=process.env.PORT||8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
console.log(__dirname);
app.use(express.static(path.join(__dirname, '/app/public')));

require('./app/routes/apiroutes.js')(app);
require('./app/routes/htmlroutes.js')(app);



app.listen(PORT,function(){console.log("App listening on PORT:"+PORT);})
