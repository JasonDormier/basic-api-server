'use strict';

module.exports = function (req, res, next) {
  if (!req.params.id) {
    next('invalid ID');
  } else {
    next();
  }
};