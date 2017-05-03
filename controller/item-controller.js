const async = require("async");
const Item = require("../model/item");
const constant = require("../config/constant");

export default class ItemController {
  getAll(req, res, next) {
    async.waterfall([
      (done)=> {
        Item.find({}, (err, doc)=> {
          if (err) {
            return next(err);
          }
          done(null, doc);
        })
      }, (doc, done)=> {
        Item.count((err, count)=> {
          done(null, {item: doc, count: count})
        })
      }], (err, data)=> {
      if (err) {
        return next(err);
      }
      res.status(constant.httpCode.OK).send(data);

    })
  }

  getOne(req, res, next) {
    const itemId = req.params.id;

    Item.findById(itemId, (err, doc)=> {
      if (err) {
        return next(err)
      }
      if (!doc) {
        res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      res.status(constant.httpCode.OK).send(doc);
    });
  }

  create(req, res, next) {
    const data = req.body;

    Item.create(data, (err, doc)=> {
      if (err) {
        return next(err);
      }
      res.status(constant.httpCode.CREATED).send({"itemUri": `items/${doc._id}`});
    });
  }

  update(req, res, next) {

    Item.findByIdAndUpdate(req.params.id, req.body, (err, doc)=> {
      if (err) {
        return next(err)
      }
      if (!doc) {
        res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      res.sendStatus(constant.httpCode.NO_CONTENT);

    })
  }

  delete(req, res, next) {
    Item.findByIdAndRemove(req.params.id, (err, doc)=> {
      if (err) {
        return next(err);
      }
      if (!doc) {
        res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      res.sendStatus(constant.httpCode.NO_CONTENT);

    })
  }


}
