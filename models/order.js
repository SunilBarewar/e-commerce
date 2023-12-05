const mongooes = require("mongoose");

const Schema = mongooes.Schema;

const orderSchema = new Schema({
  products: [{ product: Object, quantity: Number }],
  user: Schema.Types.ObjectId,
});

module.exports = mongooes.model("order", orderSchema);
