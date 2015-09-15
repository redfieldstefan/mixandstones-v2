'use strict';

const _ = require('underscore');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

const fakeCocktails = require('../mock/cocktails');
const serverConfig = require('../../server/config');
const utils = require('../../common/utils');
require('../../server/index'); // Side effect: starts server when tests run

const APP_PATH = `http:\/\/localhost:${serverConfig.port}`;
const COCKTAIL_PATH = `${serverConfig.api.base}${serverConfig.api.cocktailPath}/`;
const fakeCocktail = fakeCocktails.fakeCocktail;
const updatedFakeCocktail = fakeCocktails.updatedFakeCocktail;

let fakeCocktailId;

// ----------------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------------

// The db sorts ingredients (alphabetically), so the tests need to too
const _alphabetizeArray = (arr) => {
  return arr
    .slice()
    .sort();
};

// Confirms that an object has the general properties expected of a cocktail
const _hasShapeOfCocktail = (obj) => {
  return obj.hasOwnProperty('name') &&
    obj.hasOwnProperty('url') &&
    obj.hasOwnProperty('ingredients');
};

// Confirms that an object has the properties expected of a specific cocktail
const _matchesCocktail = (actual, expected) => {
  const expectedName = expected.name;
  const expectedUrl = utils.formatForUrl(expected.name);
  const expectedIngredients = _alphabetizeArray(expected.ingredients);

  if (!_hasShapeOfCocktail(actual)) {
    return false;
  }
  return actual.name === expectedName &&
    actual.url === expectedUrl &&
    _.isEqual(actual.ingredients, expectedIngredients);
};

// ----------------------------------------------------------------------------

describe('The cocktail API', () => {

  it('Can add a new cocktail', (done) => {
    chai
      .request(APP_PATH)
      .post(COCKTAIL_PATH)
      .send(fakeCocktail)

      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(_matchesCocktail(res.body, fakeCocktail)).to.be.true;

        fakeCocktailId = res.body._id;
        done();
      });
  });

  it('Can get a cocktail', (done) => {
    chai
      .request(APP_PATH)
      .get(`${COCKTAIL_PATH}${fakeCocktailId}`)

      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(_matchesCocktail(res.body, fakeCocktail)).to.be.true;
        done();
      });
  });

  it('Can get a list of cocktails', (done) => {
    chai
      .request(APP_PATH)
      .get(COCKTAIL_PATH)

      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(Array.isArray(res.body) && res.body.length > 0).to.be.true;
        expect(_hasShapeOfCocktail(res.body[0])).to.be.true;
        done();
      });
  });

  it('Can update a cocktail', (done) => {
    chai
      .request(APP_PATH)
      .put(`${COCKTAIL_PATH}${fakeCocktailId}`)
      .send(updatedFakeCocktail)

      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(_matchesCocktail(res.body, updatedFakeCocktail)).to.be.true;
        done();
      });
  });

  it('Can delete a cocktail', (done) => {
    chai
      .request(APP_PATH)
      .del(`${COCKTAIL_PATH}${fakeCocktailId}`)

      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.body.msg).to.equal('Cocktail Deleted');
        done();
      });
  });

});
