'use strict';

const express = require('express');
const router = express.Router();

const validator = require('../middleware/validator.js');


const ClothesModel = require('../models/data-collection-class.js');
const ClothesInterface = require('../models/clothes.js');
const clothes = new ClothesInterface(ClothesModel.clothesExport);

router.get('/clothes', getClothes);
router.get('/clothes/:id', validator, getClothesById);
router.post('/clothes', createClothes);
router.put('/clothes/:id', validator, updateClothes);
router.delete('/clothes/:id', validator, removeClothes);

function getClothes(req, res, next) {
  let resObject = clothes.read();
  res.json(resObject);
}

function getClothesById(req, res, next) {
  const id = parseInt(req.params.id);
  let resObject = clothes.read(id);
  res.json(resObject);
}

function createClothes(req, res, next) {
  const clothesObject = req.body;
  let resObject = clothes.create(clothesObject);
  res.json(resObject);
}

function updateClothes(req, res, next) {
  const id = parseInt(req.params.id);
  const clothesObject = req.body;
  let resObject = clothes.update(id, clothesObject);
  res.json(resObject);
}

function removeClothes(req, res, next) {
  const id = parseInt(req.params.id);
  let resObject = clothes.delete(id);
  res.status(204).json(resObject);
}

module.exports = router;