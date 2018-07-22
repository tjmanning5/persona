var Skill = require(ROOT + '/models/skills.js');

//todo: add persona foreign key

module.exports = function (app) {

    app.post('/api/skill.json', function (req, res) {

        var newSkill = {

            name: req.body.name,
            type: req.body.type,
            effect: req.body.effect,
            cost: req.body.cost
        };

        Skill.create(newSkill, function (err, result) {
            if (err) throw err;

            res.json(result);
        });
    });

    app.get('/api/skill.json', function (req, res) {

        Skill.findOne({ _id: req.query.id }, function (err, result) {
            if (err) throw err;

            res.json(result);
        });
    });

    app.get('/api/skills.json', function (req, res) {

        var skillQuery = {};

        if (req.query.name) {
            skillQuery.name = req.query.name;
        }

        if (req.query.type) {
            skillQuery.type = req.query.type;
        }

        var skip = parseInt(req.query.skip) || 0;

        var limit = parseInt(req.query.limit) || 25;


        Skill
            .find(skillQuery)
            .skip(skip)
            .limit(limit)
            .exec(function (err, results) {
                if (err) throw err;

                res.json(results);
            });
    });

    app.put('/api/skill.json', function (req, res) {

        Skill.findOne({ _id: req.body.id }, function(err, skillDoc) {
            if (err) throw err;

            if (req.body.name) {
                skillDoc.name = req.body.name;
            }
            if (req.body.type) {
                skillDoc.type = req.body.type;
            }
            if (req.body.effect) {
                skillDoc.effect = req.body.effect;
            }
            if (req.body.cost) {
                skillDoc.cost = req.body.cost;
            }

            skillDoc.save(function (err, result){
                if (err) throw err;

                res.json(result);
            });
        });
    });

    app.delete('/api/skill', function (req, res) {

        Skill.deleteOne({ _id: req.query.id }, function(err, result) {
            if (err) throw err;

            res.status(204);
            res.end();            
        });
    });
}