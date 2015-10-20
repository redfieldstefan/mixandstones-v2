'use strict';

var _ = require('underscore');

module.exports = {

  // e.g., 'Gin and Tonic' => 'gin-and-tonic'
  formatForUrl (str) {
    return str
      .toLowerCase()
      .replace(/\s/g, '-') // spaces => hyphens
      .replace(/[^A-Za-z0-9\-]/g, '') // strip everything that's not a space, a num, or a hyphen
      .replace(/-{2,}/g, '-'); // strip multiple hyphens
  },

  // Returns a copy of `obj` transformed according to `config`: for each key/val
  // pair in `config`, renames the corresponding key in `obj` from the `config` key
  // to the `config` val, leaving the val in `obj` unchanged
  //
  // e.g.:  { one: 10, two: 20 }, { one: 'uno' } => { uno: 10, two: 20 }
  transformKeys (obj, config) {
    return _.reduce(obj, (memo, val, key) => {
      const newKey = config[key];
      if (newKey) {
        memo[newKey] = val;
      } else {
        memo[key] = val;
      }
      return memo;
    }, {});
  }

};
