var Fusion = require(ROOT + '/models/skills.js');

module.exports = function (app) {

    app.post('/api/fusion.json', function (req, res) {

        var newFusion = {

            cost: req.body.cost,
            ingredient: req.body.ingredient,
            output: req.body.output

        };

        Fusion.create(newFusion, function (err, result) {
            if (err) throw err;

            res.json(result);
        });
    });

    app.get('/api/fusion.json', function (req, res) {

        Fusion.findOne({ _id: req.query.id }, function (err, result) {
            if (err) throw err;

            res.json.result;
        });
    });

    app.get('/api/fusions.json', function (req, res) {

        var fusionQuery = {};

        if (req.query.ingredient) {
            fusionQuery.ingredient = req.query.ingredient;
        }

        if (req.query.output) {
            fusionQuery.output = req.query.output
        }

        var skip = parseInt(req.query.skip) || 0;

        var limit = parseInt(req.query.limit) || 25;

        Fusion
            .find(fusionQuery)
            .skip(skip)
            .limit(limit)
            .exec(function (err, results) {
                if (err) throw err;

                res.json(results);
            });
    });

    app.put('/api/fusion.json', function (req, res) {

        Fusion.findOne({ _id: req.body.id }, function (err, fusionDoc) {
            if (err) throw err;

            if (req.body.cost) {
                fusionDoc.cost = req.body.cost;
            }
            if (req.body.ingredient) {
                fusionDoc.ingredient = req.body.ingredient;
            }
            if (req.body.output) {
                fusionDoc.output = req.body.output;
            }

            fusionDoc.save(function (err, result) {
                if(err) throw err;

                res.json(result);
            });
        });
    });

    app.delete('/api/fusion', function (req, res) {

        Fusion.deleteOne({ _di: req.qeury.id }, function (err, result) {
            if(err) throw err;

            res.status(204);
            res.end();
        });
    });
}