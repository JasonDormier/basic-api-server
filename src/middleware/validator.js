'use strict';

module.exports = function (req, res, next) {
  if (!parseInt(req.params.id)) {
    next('invalid ID');
  } else {
    next();
  }
};