var Persona = require(ROOT + '/models/persona.js');

module.exports = function (app) {

    app.post('/api/persona.json', function (req, res) {
        

        var newPersona = {
            name: req.body.name,
            level: req.body.level,
        }

        if (req.body.stats) {
            newPersona.stats = {
                strength: req.body.stats.strength,
                magic: req.body.stats.magic,
                endurance: req.body.stats.endurance,
                agility: req.body.stats.agility,
                luck: req.body.stats.luck
            }
        }
        if (req.body.elementals) {
            newPersona.elementals = {
                elementals: {
                    physical: req.body.elementals.physical || null,
                    gun: req.body.elementals.gun || null,
                    fire: req.body.elementals.fire || null,
                    ice: req.body.elementals.ice || null,
                    electric: req.elementals.body.electric || null,
                    wind: req.body.elementals.wind || null,
                    psychic: req.body.elementals.psychic || null,
                    nuclear: req.body.elementals.nuclear || null,
                    bless: req.body.elementals.bless || null,
                    curse: req.body.elementals.curse || null
                }
            }
        }
        
        Persona.create(newPersona, function (err, result) {
            if (err) throw err;

            res.json(result);
        });
    });



    app.get('/api/persona.json', function (req, res) {
        Persona.findOne({ _id: req.query.id }, function (err, result) {
            if (err) throw err;

            res.json(result);
        });
    });

    app.get('/api/personas.json', function (req, res) {

        var personaQuery = {};

        if (req.query.name) {
            personaQuery.name = req.query.name;
        }

        if (req.query.level) {
            personaQuery.level = req.query.name;
        }

        if (req.query.elementals) {
            personaQuery.elementals = req.query.elementals;
        }

        var skip = parseInt(req.query.skip) || 0;

        var limit = parseInt(req.query.limit) || 25;

        Persona
            .find(personaQuery)
            .skip(skip)
            .limit(limit)
            .exec(function (err, results) {
                if (err) throw err;

                res.json(results);
            });
    });

    app.put('/api/persona.json', function (req, res) {
        Persona.findOne({ _id: req.body.id }, function (err, personaDoc) {
            if (err) throw err;

            if (req.body.name) {
                personaDoc.name = req.body.name;
            }
            if (req.body.level) {
                personaDoc.level = req.body.level;
            }

            if (req.body.stats) {
                personaDoc.stats = {
                    strength: req.body.stats.strength,
                    magic: req.body.stats.magic,
                    endurance: req.body.stats.endurance,
                    agility: req.body.stats.agility,
                    luck: req.body.stats.luck
                };
            }

            if (req.body.elementals) {
                personaDoc.elementals = {
                    physical: req.body.elementals.physical || null,
                    gun: req.body.elementals.gun || null,
                    fire: req.body.elementals.fire || null,
                    ice: req.body.elementals.ice || null,
                    electric: req.body.elementals.electric || null,
                    wind: req.body.elementals.wind || null,
                    psychic: req.body.elementals.psychic || null,
                    nuclear: req.body.elementals.nuclear || null,
                    bless: req.body.elementals.bless || null,
                    curse: req.body.elementals.curse || null
                };
            }

            personaDoc.save(function (err, result) {
                if (err) throw err;

                res.json(result);
            });
        });
    });

    app.delete('api/persona', function (req, res) {

        Persona.deleteOne({ _id: req.qeury.id }, function (err, result) {
            if (err) throw err;

            res.status(204);
            res.end();
        });
    });
}