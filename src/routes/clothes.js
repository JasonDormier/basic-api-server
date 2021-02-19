'use strict';

const express = require('express');
const router = express.Router();

const validator = require('../middleware/validator.js');


const ClothesModel = require('../models/data-collection-class.js');
const ClothesInterface = require('../models/clothes.js');
const clothes = new ClothesInterface(ClothesModel.clothesExport);

router.get('/clothes', getClothesById);
router.get('/clothes/:id', validator, getClothesById);
router.post('/clothes', createClothes);
router.put('/clothes/:id', validator, updateClothes);
router.delete('/clothes/:id', validator, removeClothes);

// function getClothes(req, res, next) {
//   let resObject = clothes.read();
//   res.json(resObject);
// }

async function getClothesById(req, res, next) {
  const id = req.params.id;
  let resObject = await clothes.read(id);
  res.json(resObject);
}

async function createClothes(req, res, next) {
  const foodObject = req.body;
  const resObject = await clothes.create(foodObject);
  res.json(resObject);
}

async function updateClothes(req, res, next) {
  const id = req.params.id;
  const foodObject = req.body;
  const resObject = await clothes.update(id, foodObject);
  res.json(resObject);
}

async function removeClothes(req, res, next) {
  const id = req.params.id;
  const resObject = await clothes.delete(id);
  res.status(200).json(resObject);
}

module.exports = router;