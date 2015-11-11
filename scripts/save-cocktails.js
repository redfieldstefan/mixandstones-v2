#!/usr/bin/env node
'use strict';

const cocktails = require('../cocktails.json');

cocktails.forEach(function(cocktail) {
  const forSave = cocktail;

  console.log(forSave);
})
