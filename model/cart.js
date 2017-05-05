const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  userId: Number,
  items: [{
    count: Number,
    item: {
      type: Schema.ObjectId,
      ref: "Item"
    }
  }]
});

module.exports = mongoose.model('Cart', cartSchema);
