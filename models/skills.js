var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var skillSchema = new Schema({
    name: String,
    type: String,
    effect: String,
    cost: String
});

var Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;