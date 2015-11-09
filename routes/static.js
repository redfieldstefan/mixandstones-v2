'use strict';

import express from 'express';
import path from 'path';

module.exports = (app) => {
  app.use('/dist', express.static(path.join(__dirname, '../dist')));
};
