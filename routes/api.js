'use strict';

var Cocktail = require('../models/cocktail_model');
var Ingredient = require('../models/ingredient_model');
var utils = require('../common/utils');

var COCKTAIL_URL = '/api/cocktails';
var INGREDIENT_URL = '/api/ingredients';

var _prepForDb = function(cocktail) {
  return {
    name: cocktail.name,
    url: utils.formatForUrl(cocktail.name),
    description: cocktail.description ?
      cocktail.description :
      '',
    ingredients: cocktail.ingredients ?
      cocktail.ingredients.sort() :
      []
  };
};

module.exports = function(app) {

  app.post(COCKTAIL_URL, function(req, res) {
    var cocktail = new Cocktail(_prepForDb(req.body));
    cocktail.save(function(err, dbRes) {
      if(err) {
        console.log(err);
        return dbRes.status(500).json({msg: 'server error'});
      }
      return res.status(200).json(dbRes);
    });
  });

  app.get(COCKTAIL_URL, function(req, res) {
    Cocktail.find({}, function(err, dbRes) {
      if(err) {
        console.log(err);
        return dbRes.status(500).json({msg: 'server error'});
      }
      return res.status(200).json(dbRes);
    });
  });

  app.get(COCKTAIL_URL + '/:id', function(req, res) {
    Cocktail.findOne({_id: req.params.id}, function(err, dbRes) {
      if(err) {
        console.log(err);
        return dbRes.status(500).json({msg: 'server error'});
      }
      return res.status(200).json(dbRes);
    });
  });

  app.put(COCKTAIL_URL + '/:id', function(req, res) {
    var updatedDrink = _prepForDb(req.body);
    Cocktail.findOneAndUpdate({ _id: req.params.id },
      updatedDrink, {
        new: true
      },
      function(err, dbResponse) {
        if (err) {
          console.log(err);
          return dbRes.status(500).json({msg: 'server error'});
        }
        return res.status(200).json(dbResponse);
    });
  });

  app.delete(COCKTAIL_URL + '/:id', function(req, res) {
    Cocktail.remove({_id: req.params.id}, function(err) {
      if(err) {
        console.log(err);
        return dbRes.status(500).json({msg: 'server error'});
      }
      return res.status(200).json({msg:'Cocktail Deleted'});
    });
  });

};
