var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ObjectId = mongoose.Schema.ObjectId;

var personaSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    level: {
        type: Number,
        required: true,
    },
    stats: {
        strength: {
            type: Number,
            required: true,
        },
        magic: {
            type: Number,
            required: true,
        },
        endurance: {
            type: Number,
            required: true,
        },
        agility: {
            type: Number,
            required: true,
        },
        luck: {
            type: Number,
            required: true,
        }
    },
    elementals: {
        physical: {
            type: String,
            enum: ['weak', 'resist', 'absorb'],
            default: null,
        },
        gun: {
            type: String,
            enum: ['weak', 'resist', 'absorb'],
            default: null,
        },
        fire: {
            type: String,
            enum: ['weak', 'resist', 'absorb'],
            default: null,
        },
        ice: {
            type: String,
            enum: ['weak', 'resist', 'absorb'],
            default: null,
        },
        electric: {
            type: String,
            enum: ['weak', 'resist', 'absorb'],
            default: null,
        },
        wind: {
            type: String,
            enum: ['weak', 'resist', 'absorb'],
            default: null,
        },
        psychic: {
            type: String,
            enum: ['weak', 'resist', 'absorb'],
            default: null,
        },
        nuclear: {
            type: String,
            enum: ['weak', 'resist', 'absorb'],
            default: null,
        },
        bless: {
            type: String,
            enum: ['weak', 'resist', 'absorb'],
            default: null,
        },
        curse: {
            type: String,
            enum: ['weak', 'resist', 'absorb'],
            default: null,
        }
    },
    // elementals: [{
    //     defensive_type: {
    //         type: String,
    //         enum: ['physical', 'gun', 'fire', 'ice', 'electric', 'wind', 'psychic', 'nuclear', 'bless', 'curse'],

    //     },
    //     effectiveness: {
    //         type: String,
    //         enum: ['weak', 'resist', 'absorb'],
    //     }
    // }],
    skills: [
        {
            type: ObjectId,
            ref: 'Skill',
            required: true,
        }
    ]       
});

var Persona = mongoose.model('Persona', personaSchema);

module.exports = Persona;
