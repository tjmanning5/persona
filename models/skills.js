var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.ObjectId;

var Schema = mongoose.Schema;

var skillSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {       
        type: String,
        required: true
    },
    effect: {
        type: String,
        required: true
    },
    cost: {
        type: String,
        required: true
    },
    persona: [
        {
            level: {
                type: Number,
                required: true
                //set starting abilities to equal persona level from personaSchema
            },
            persona_id: {
                type: ObjectId,
                ref: 'Persona',
                required: true
            }
        }
    ]
});

var Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;