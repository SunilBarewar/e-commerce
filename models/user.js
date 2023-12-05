// const { getDb } = require("../util/database");
// const { ObjectId } = require("mongodb");
const mongooes = require("mongoose");
const { Schema } = mongooes;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    type: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "product" },
        quantity: { type: Number, default: 0 },
      },
    ],
    default: [],
  },
});

userSchema.methods.addToCart = function (product) {
  const proIndex = this.cart.findIndex((p) => p.productId.equals(product._id));
  let updatedCart = [...this.cart];
  if (proIndex !== -1) {
    updatedCart[proIndex].quantity += 1;
  } else {
    updatedCart.push({ productId: product._id, quantity: 1 });
  }
  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.removeFromCart = function (prodId) {
  const updatedCart = this.cart.filter(
    (item) => item.productId.toString() !== prodId.toString()
  );

  this.cart = updatedCart;
  return this.save();
};
module.exports = mongooes.model("user", userSchema);

// class User {
//   constructor(name, email, _id, cart = []) {
//     this.name = name;
//     this.email = email;
//     this.cart = cart;
//     this._id = _id;
//   }

//   async save() {
//     const db = getDb();
//     return await db.collection("users").insertOne({ ...this });
//   }

//   async addToCart(product) {
//     const proIndex = this.cart.findIndex((p) =>
//       p.productId.equals(product._id)
//     );
//     let updatedCart;
//     if (proIndex !== -1) {
//       this.cart[proIndex].quantity += 1;
//       updatedCart = this.cart;
//     } else {
//       updatedCart = [
//         ...this.cart,
//         { productId: new ObjectId(product._id), quantity: 1 },
//       ];
//     }

//     const db = getDb();
//     return await db.collection("users").updateOne(
//       { _id: new ObjectId(this._id) },
//       {
//         $set: {
//           cart: updatedCart,
//         },
//       }
//     );
//   }

//   async removeProductFromCart(prodId) {
//     const updatedCart = this.cart.filter(
//       (item) => item.productId.toString() !== prodId.toString()
//     );

//     const db = getDb();
//     return await db.collection("users").updateOne(
//       { _id: new ObjectId(this._id) },
//       {
//         $set: {
//           cart: updatedCart,
//         },
//       }
//     );
//   }

//   async getCart() {
//     const productIds = this.cart.map((i) => i.productId);
//     const db = getDb();
//     let products = await db
//       .collection("products")
//       .find({ _id: { $in: productIds } })
//       .toArray();

//     products = products.map((p) => {
//       const quantity = this.cart.find(
//         (item) => item.productId.toString() === p._id.toString()
//       ).quantity;

//       return {
//         ...p,
//         quantity,
//       };
//     });
//     return products;
//   }
//   static async findById(userId) {
//     const db = getDb();

//     return await db.collection("users").findOne({ _id: new ObjectId(userId) });
//   }

//   async addOrder() {
//     const db = getDb();
//     const products = await this.getCart();
//     const order = {
//       products,
//       user: {
//         _id: new ObjectId(this._id),
//         name: this.name,
//       },
//     };

//     await db.collection("orders").insertOne(order);

//     this.cart = [];

//     return await db.collection("users").updateOne(
//       { _id: new ObjectId(this._id) },
//       {
//         $set: { cart: [] },
//       }
//     );
//   }

//   async getOrders() {
//     const db = getDb();

//     return await db
//       .collection("orders")
//       .find({ "user._id": new ObjectId(this._id) })
//       .toArray();
//   }
// }

// module.exports = User;
