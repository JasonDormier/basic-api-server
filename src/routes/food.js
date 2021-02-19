'use strict';

const express = require('express');
const router = express.Router();

const validator = require('../middleware/validator.js');

const FoodModel = require('../models/data-collection-class.js');
const FoodInterface = require('../models/food.js');
const food = new FoodInterface(FoodModel.foodExport);

router.get('/food', getfoodById);
router.get('/food/:id', validator, getfoodById);
router.post('/food', createfood);
router.put('/food/:id', validator, updatefood);
router.delete('/food/:id', validator, removefood);

// async function getfood(req, res, next) {
//   let resObject = food.read();
//   res.json(resObject);
// }

async function getfoodById(req, res, next) {
  const id = parseInt(req.params.id);
  let resObject = await food.read(id);
  res.json(resObject);
}

async function createfood(req, res, next) {
  const foodObject = req.body;
  const resObject = await food.create(foodObject);
  res.json(resObject);
}

async function updatefood(req, res, next) {
  const id = parseInt(req.params.id);
  const foodObject = req.body;
  const resObject = await food.update(id, foodObject);
  res.json(resObject);
}

async function removefood(req, res, next) {
  const id = parseInt(req.params.id);
  const resObject = await food.delete(id);
  res.status(204).json(resObject);
}

module.exports = router;