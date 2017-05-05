const async = require("async");
const Cart = require("../model/cart");
const constant = require("../config/constant");

const mapItemToUri = (items) => {
  return items.map(({count, item}) => {
    return {uri: `items/${item}`, count};
  });
};

export default class cartController {
  create(req, res, next) {
    Cart.create(req.body, (err, doc)=> {
      if (err) {
        return next(err)
      }
      res.status(constant.httpCode.CREATED).send({"cartUri": `carts/${doc._id}`});
    })
  }

  getAll(req, res, next) {
    async.waterfall([(done)=> {
      Cart.find({}, (err, docs)=> {
        if (err) {
          return next(err);
        }
        let carts = docs.map(doc=> {
          let cart = doc.toJSON();    //为什么是toJSON
          cart.items = mapItemToUri(cart.items);
          return cart;
        });
        done(null, carts);
      })
    }, (doc, done)=> {
      Cart.count((err, count)=> {
        if (err) {
          return next(err)
        }
        done(null, {cart: doc, totalCount: count})
      })
    }], (err, data)=> {
      if (err) {
        return next(err);
      }
      res.status(constant.httpCode.OK).send(data);
    })
  }
}