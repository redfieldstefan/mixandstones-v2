#!/usr/bin/env node
'use strict';

require('babel/register');
const Cocktail = require('../models/cocktail-model')
const request = require('request');
const _ = require('underscore');
const async = require('async');
const utils = require('../common/utils');

request('http://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic', function(err, res, body) {
  if(err) {
    return console.log(err);
  }
  var bodyObj = JSON.parse(body);
  var drinkIds = bodyObj.drinks.map(function(drink) {
    return drink.idDrink;
  });


  const cocktailList = []
  // var parallelFetches = drinkIds.map(function (drink) {
  //   return function (callback) {
  //     request('http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + drink, function (err, res, body) {
  //         cocktailList.push(body);
  //         callback();
  //     });
  //   };
  // });

request('http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=14542', function (err, res, body) {
    cocktailList.push(body);
    cocktailList.forEach(function(dumbCocktail) {
      var cocktail = JSON.parse(dumbCocktail).drinks[0];
      const ingredients = _.chain(cocktail)
        .keys()
        .filter(function(key) {
          return key.indexOf("strIngredient") > -1;
        })
        .map(function(key) {
          return cocktail[key];
        })
        .filter(function(ingredient) {
          return ingredient.length;
        })
        .value();

      const forSave = {
        name: cocktail.strDrink,
        ingredients: ingredients,
        description: cocktail.strInstructions
      };

      request.post({
        url: 'http://localhost:3000/api/cocktails',
        json: true,
        body: forSave
      }, function (err, res) {
        console.log(err);
      })

      // request.post('/api/cocktails', forSave, function(err, res) {
      //   console.log(res);
      // });



      // var newCocktail = new Cocktail(utils.prepForDb(forSave));
      // newCocktail.save().then(function (cocktail) {
      //   console.log(cocktail);
      // });
      // newCocktail.save(function(err, cocktail) {
      //   console.log('!!!!!!!!!!!!!!!!!!')
      //   if(err) {
      //     return console.log(err);
      //   }
      //   console.log(cocktail);
      // });
    });
});


  //async.parallel(parallelFetches, function () {
    //cocktailList.forEach(function(dumbCocktail) {
      // console.log(typeof(dumbCocktail));
      // console.log(dumbCocktail);
      //var cocktail = JSON.parse(dumbCocktail);
     // console.log(dumbCocktail);
      // const ingredients = _.chain(cocktail)
      //   .keys()
      //   .filter(function(key) {
      //     return key.indexOf("strIngredient") > -1;
      //   })
      //   .map(function(key) {
      //     return cocktail[key];
      //   })
      //   .value();

      // const forSave = {
      //   name: cocktail.strDrink,
      //   ingredients: ingredients,
      //   description: cocktail.strInstructions
      // }

      //console.log(forSave);

      // Cocktail.create(utils.prepForDb(forSave), function(err, res) {
      //   if(err) {
      //     console.log(err);
      //     return res.json({msg: 'Server Error'});
      //   }
      // })
    //});
  //});


  // drinkIds.forEach(function(id) {
  //   request(('http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + id), function(err, res, body) {
  //     if(err) {
  //       return console.log(err);
  //     }
  //     return JSON.parse(body));
  //   });
  // });
});
