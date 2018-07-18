var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var skillsSchema = new Schema({
    name: String,
    type: String,
    effect: String,
    cost: String
});