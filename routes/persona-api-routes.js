var Persona = require(ROOT + '/models/persona.js');

module.exports = function (app) {

    app.post('/api/persona.json', function (req, res) {

        var newPersona = {
            name: req.body.name,
            level: req.body.level,
            stats:, //help
            elementals:, //help
        };

        Peronsa.create(newPersona, function (err, result) {
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
            skillQuery.name = req.query.name;
        }

        if (req.query.level) {
            skillQuery.level = req.query.name;
        }

        if (req.query.elementals) {
            skillQuery.elementals = req.query.elementals;
        }

        var skip = parseInt(req.query.skip) || 0;

        var limit = parseInt(req.query.limit) || 25;

        Persona
            .find(skillQuery)
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
                personaDoc.stats = req.body.stats; //help
            }
            if (req.body.elementals) {
                personaDoc.elementals = req.body.elementals; //help
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