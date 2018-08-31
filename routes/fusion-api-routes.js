var Fusion = require(ROOT + '/models/fusions.js');
var _ = require('lodash');

module.exports = function (app) {

    app.post('/api/fusion.json', function (req, res) {       

        var newFusion = {

            cost: req.body.cost,           
            ingredients: req.body.ingredients,           
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

            // syntax yo. You dropped these () 
            res.json(result);
            // also i figured out how to use emojis in VScode 😎💃💯💰
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

            // this all looks great 👏🍆💋

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

    // Here you could add in two more put routes, that's almost the exact same as your add/remove persona routes in the Skill API. The only difference would really be instead of manipulating the persona array on the skill document, you would be manipulating the ingredients array on the fusion document.

    app.put('/api/fusion/add_ingredient.json', function(req, res) {

        Fusion.findOne({ _id: req.body.id }, function (err, result) {
            if (err) throw err;

            var find = result.ingredients.indexOf(req.body.ingredient_id);

            if (find > 0) {
                console.log('Duplicate entry');
                res.status(400);
                res.end();
            } else {
                result.ingredients.push(req.body.ingredient_id);

                result.save(function (err, result) {
                    if (err) throw err;

                    res.json(result);
                });
            }
        });
    });    

    app.put('/api/fusion/remove_ingredient.json', function(req, res) {

        Fusion.findOne({ _id: req.body.id }, function(err, result) {
            if (err) throw err;

            var index = result.ingredients.indexOf(req.body.ingredient_id);

            if (index < 0) {
                console.log('Ingredient not found');
                res.status(400);
                res.end();
            } else {
                result.ingredients.splice(index, 1);

                result.save(function(err, result) {
                    if (err) throw err;
                    res.json(result);
                })
            }
        });

    });     

    app.delete('/api/fusion', function (req, res) {

        Fusion.deleteOne({ _id: req.query.id }, function (err, result) {
            if(err) throw err;

            res.status(204);
            res.end();
        });
    });
}