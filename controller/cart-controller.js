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
          let cart = doc.toJSON();
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

  getOne(req, res, next) {
    const cartId = req.params.id;

    Cart.findById(cartId, (err, doc)=> {
      if (err) {
        return next(err);
      }
      if (!doc) {
        res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      let data = doc.toJSON();
      let items = doc.items;
      data.items = mapItemToUri(items);
      res.status(constant.httpCode.OK).send(doc);
    });
  }

  update(req, res, next) {
    Cart.findByIdAndUpdate(req.params.id, req.body, (err, doc)=> {
      if (err) {
        return next(err);
      }
      if (!doc) {
        res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      res.sendStatus(constant.httpCode.NO_CONTENT);
    })
  }

  delete(req, res, next) {
    Cart.findByIdAndRemove(req.params.id, (err, doc)=> {
      if (err) {
        return next(err)
      }
      if (!doc) {
        res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      res.sendStatus(constant.httpCode.NO_CONTENT);
    })
  }


}