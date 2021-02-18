'use strict';

const express = require('express');
const router = express.Router();

const validator = require('../middleware/validator.js');

const FoodInterface = require('../models/food.js');
const food = new FoodInterface();

router.get('/food', getfood);
router.get('/food/:id', validator, getfoodById);
router.post('/food', createfood);
router.put('/food/:id', validator, updatefood);
router.delete('/food/:id', validator, removefood);

function getfood(req, res, next) {
  let resObject = food.read();
  res.json(resObject);
}

function getfoodById(req, res, next) {
  const id = parseInt(req.params.id);
  let resObject = food.read(id);
  res.json(resObject);
}

function createfood(req, res, next) {
  const foodObject = req.body;
  let resObject = food.create(foodObject);
  res.json(resObject);
}

function updatefood(req, res, next) {
  const id = parseInt(req.params.id);
  const foodObject = req.body;
  let resObject = food.update(id, foodObject);
  res.json(resObject);
}

function removefood(req, res, next) {
  const id = parseInt(req.params.id);
  let resObject = food.delete(id);
  res.status(204).json(resObject);
}

module.exports = router;