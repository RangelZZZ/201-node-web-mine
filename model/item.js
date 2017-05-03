'use strict';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: String,
  price: Number
});

module.exports = mongoose.model("Item", itemSchema);