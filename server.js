ROOT = __dirname;

var bodyParser = require('body-parser');

const express = require('express');
const app = express();

app.use(bodyParser.json());

app.use(express.static('public'));

// we were missing the below 4 lines, that imported the controller files and attached them to Express. So it didn't know that you had set a POST method (or any method for that matter) for the request URLs. My bad dude :(
require("./routes/fusion-api-routes.js")(app);
require("./routes/persona-api-routes.js")(app);
require("./routes/skill-api-routes.js")(app);
// require("./routes/html-routes.js")(app); // This file isn't set up yet, so I'm commenting out the import

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/persona', {useNewUrlParser: true});

const port = 3000;

app.listen(port, function() {
    console.log(`Server running on port ${port}`);
});