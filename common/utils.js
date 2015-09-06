'use strict';

module.exports = {

  // e.g., 'Gin and Tonic' => 'gin-and-tonic'
  formatForUrl: function (str) {
    return str
      .toLowerCase()
      .replace(/\s/g, '-') // spaces => hyphens
      .replace(/[^A-Za-z0-9\-]/g, '') // strip everything that's not a space, a num, or a hyphen
      .replace(/-{2,}/g, '-'); // strip multiple hyphens
  }

};
