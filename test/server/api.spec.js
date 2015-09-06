'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
chai.use(chaiHttp);

var serverConfig = require('../../server/config.json');
require('../../server/index');

var API_BASE = '/api/cocktails/';
var APP_PATH = 'http://localhost:' + serverConfig.port;

var fakeCocktail = {
  name: 'Fake cocktail',
  ingredients: [
    'gin',
    'peanut butter'
  ]
};
var updatedFakeCocktail = {
  name: 'Updated fake cocktail',
  ingredients: [
    'gin',
    'peanut butter',
    'jelly'
  ]
};
var fakeCocktailId;

describe('The cocktail API', function () {

  it('Can add a new cocktail', function (done) {
    chai
      .request(APP_PATH)
      .post(API_BASE)
      .send(fakeCocktail)
      .end(function (err, res) {
        var expectedName = fakeCocktail.name;

        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.name).to.equal(expectedName);

        fakeCocktailId = res.body._id;
        done();
      });
  });

  it('Can update a cocktail', function (done) {
    chai
      .request(APP_PATH)
      .put(API_BASE + fakeCocktailId)
      .send(updatedFakeCocktail)
      .end(function (err, res) {
        var expectedName = updatedFakeCocktail.name;
        var expectedIngredients = updatedFakeCocktail.ingredients;
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.msg).to.equal('Cocktail updated');
        done();
      });
  });

  it('Can delete a cocktail', function (done) {
    chai
      .request(APP_PATH)
      .del(API_BASE + fakeCocktailId)
      .end(function (err, res) {
        expect(err).to.be.null;
        console.log(res.body);
        expect(res.body.msg).to.equal('Cocktail Deleted');
        done();
      });
  });

});
