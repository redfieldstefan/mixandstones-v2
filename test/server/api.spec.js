'use strict';

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

// The db sorts ingredients (alphabetically), so the tests need to too
var _alphabetizeArray = function (arr) {
  return arr
    .slice()
    .sort();
};

describe('The cocktail API', function () {

  it('Can add a new cocktail', function (done) {
    chai
      .request(APP_PATH)
      .post(API_BASE)
      .send(fakeCocktail)

      .end(function (err, res) {
        var expectedName = fakeCocktail.name;
        var expectedUrl = utils.formatForUrl(fakeCocktail.name);
        var expectedIngredients = _alphabetizeArray(fakeCocktail.ingredients);

        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.name).to.equal(expectedName);
        expect(res.body.url).to.equal(expectedUrl);
        expect(res.body.ingredients).to.deep.equal(expectedIngredients);

        fakeCocktailId = res.body._id;
        done();
      });
  });

  it('Can get a cocktail', function (done) {
    chai
      .request(APP_PATH)
      .get(API_BASE + fakeCocktailId)

      .end(function (err, res) {
        var expectedName = fakeCocktail.name;
        var expectedUrl = utils.formatForUrl(fakeCocktail.name);
        var expectedIngredients = _alphabetizeArray(fakeCocktail.ingredients);

        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.name).to.equal(expectedName);
        expect(res.body.url).to.equal(expectedUrl);
        expect(res.body.ingredients).to.deep.equal(expectedIngredients);
        done();
      });
  })

  it('Can update a cocktail', function (done) {
    chai
      .request(APP_PATH)
      .put(API_BASE + fakeCocktailId)
      .send(updatedFakeCocktail)

      .end(function (err, res) {
        var expectedName = updatedFakeCocktail.name;
        var expectedUrl = utils.formatForUrl(updatedFakeCocktail.name);
        var expectedIngredients = _alphabetizeArray(updatedFakeCocktail.ingredients);

        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.name).to.equal(expectedName);
        expect(res.body.url).to.equal(expectedUrl);
        expect(res.body.ingredients).to.deep.equal(expectedIngredients);
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
