ROOT = __dirname;

var bodyParser = require('body-parser');

const express = require('express');
const app = express();

app.use(bodyParser.json());

app.use(express.static('public'));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/persona', {useNewUrlParser: true});

const port = 3000;

app.listen(port, function() {
    console.log(`Server running on port ${port}`);
});