var Fusion = require(ROOT + '/models/skills.js');
var _ = require('lodash');

module.exports = function (app) {

    app.post('/api/fusion.json', function (req, res) {

        // imagine that this is your example API request
        // req.body = {
        //     cost: 1200,
        //     output: 1234987h23kjbsf9879sdf,
        //     ingredients: [
        //         592348hkjgbs8g79f6wer9,
        //         239kng987erg93n43345ge,
        //         kjfhnskeruihoe89387459
        //     ]
        // }

        var newFusion = {

            cost: req.body.cost,
            // instead of just one ingredient, let's accept an array of ingredient _ids from the request (such as in the example above). Remember to refer to your Schema's to make sure the format of your document here matches the format of the schema. So for example, in our Schema we have 'ingredients' instead of 'ingredient' and it's an array.
            ingredients: req.body.ingredients,
            // here's what I would do instead of the above line (again assuming the above request example format):
            // ingredients: req.body.ingredients
            // so req.body.ingredients is an array (seen in the example on line 11) so we can just save that whole array from the request to the document, and not have to make multiple calls. So we can add all the _ids at once, instead of one at a time.
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

        Fusion.deleteOne({ _di: req.qeury.id }, function (err, result) {
            if(err) throw err;

            res.status(204);
            res.end();
        });
    });
}