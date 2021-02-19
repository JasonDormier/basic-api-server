'use strict';

const mongoose = require('mongoose');
const foodSchema = mongoose.Schema({
  type: { type: String, required: true },
  cut: { type: String },
});

const clothesSchema = mongoose.Schema({
  type: { type: String, required: true },
  item: { type: String },
});

const foodExport = mongoose.model('food', foodSchema);
const clothesExport = mongoose.model('clothes', clothesSchema);
module.exports = { foodExport, clothesExport };