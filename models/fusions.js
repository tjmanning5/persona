var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.ObjectId;

var Schema = mongoose.Schema;

var fusionSchema = new Schema ({
    cost: {
        type: Number, 
        required: true
    },
    ingredients: [
        {
            type: ObjectId,
            ref: 'Persona',
            required: true
        }    
    ],
    output: {
        type: ObjectId,
        ref: 'Persona',
        required: true
    }
});

var Fusion = mongoose.model('Fusion', fusionSchema);

module.exports = Fusion;