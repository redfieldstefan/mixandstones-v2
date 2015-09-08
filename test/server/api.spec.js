'use strict';

var _ = require('underscore');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
chai.use(chaiHttp);

var fakeCocktails = require('../mock/cocktails');
var serverConfig = require('../../server/config');
var utils = require('../../common/utils');
require('../../server/index'); // Side effect: starts server when tests run

var API_BASE = '/api/cocktails/';
var APP_PATH = 'http://localhost:' + serverConfig.port;
var fakeCocktail = fakeCocktails.fakeCocktail;
var updatedFakeCocktail = fakeCocktails.updatedFakeCocktail;

var fakeCocktailId;

// ----------------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------------

// The db sorts ingredients (alphabetically), so the tests need to too
var _alphabetizeArray = function (arr) {
  return arr
    .slice()
    .sort();
};

// Confirms that an object has the general properties expected of a cocktail
var _hasShapeOfCocktail = function (obj) {
  return obj.hasOwnProperty('name') &&
    obj.hasOwnProperty('url') &&
    obj.hasOwnProperty('ingredients');
};

// Confirms that an object has the properties expected of a specific cocktail
var _matchesCocktail = function (actual, expected) {
  var expectedName = expected.name;
  var expectedUrl = utils.formatForUrl(expected.name);
  var expectedIngredients = _alphabetizeArray(expected.ingredients);

  if (!_hasShapeOfCocktail(actual)) {
    return false;
  }
  return actual.name === expectedName &&
    actual.url === expectedUrl &&
    _.isEqual(actual.ingredients, expectedIngredients);
};

// ----------------------------------------------------------------------------

describe('The cocktail API', function () {

  it('Can add a new cocktail', function (done) {
    chai
      .request(APP_PATH)
      .post(API_BASE)
      .send(fakeCocktail)

      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(_matchesCocktail(res.body, fakeCocktail)).to.be.true;

        fakeCocktailId = res.body._id;
        done();
      });
  });

  it('Can get a cocktail', function (done) {
    chai
      .request(APP_PATH)
      .get(API_BASE + fakeCocktailId)

      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(_matchesCocktail(res.body, fakeCocktail)).to.be.true;
        done();
      });
  });

  it('Can get a list of cocktails', function (done) {
    chai
      .request(APP_PATH)
      .get(API_BASE)

      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(Array.isArray(res.body) && res.body.length > 0).to.be.true;
        expect(_hasShapeOfCocktail(res.body[0])).to.be.true;
        done();
      });
  });

  it('Can update a cocktail', function (done) {
    chai
      .request(APP_PATH)
      .put(API_BASE + fakeCocktailId)
      .send(updatedFakeCocktail)

      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(_matchesCocktail(res.body, updatedFakeCocktail)).to.be.true;
        done();
      });
  });

  it('Can delete a cocktail', function (done) {
    chai
      .request(APP_PATH)
      .del(API_BASE + fakeCocktailId)

      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res.body.msg).to.equal('Cocktail Deleted');
        done();
      });
  });

});
