const async = require("async");
const Category = require("../model/category");
const constant = require("../config/constant");

export default class CategoryController {
  create(req, res, next) {
    async.waterfall([(done)=> {
      const data = req.body;
      Category.findOne({name: data.name}, (err, doc)=> {
        if (err) {
          return next(err);
        }
        if (doc.length !== 0) {
          return res.sendStatus(constant.httpCode.DUPLICATE_CONTENT);
        }
        done(null, data);
      })
    }, (data, done)=> {
      Category.create(data, (err, doc)=> {
        if (err) {
          return next(err);
        }
        done(err, doc);
      })
    }], (err, doc)=> {
      if (err) {
        return next(err);
      }
      res.status(constant.httpCode.CREATED).send({"categoryUri": `categories/${doc._id}`});
    })
  }

  getOne(req, res, next) {
    Category.findById(req.params.id, (err, doc)=> {
      if (err) {
        return next(err);
      }
      if (!doc) {
        res.sendStatus(constant.httpCode.NOT_FOUND);
      }

      res.status(constant.httpCode.OK).send(doc);
    })
  }

  getAll(req, res, next) {
    async.waterfall([(done)=> {
      Category.find({}, (err, doc)=> {
        if (err) {
          return next(err);
        }
        done(null, doc);
      })
    }, (doc, done)=> {
      Category.count((err, count)=> {
        done(null, {categories: doc, totalCount: count});
      })
    }], (err, data)=> {
      if (err) {
        return next(err);
      }
      res.status(constant.httpCode.OK).send(data);
    })
  }

  update(req, res, next) {

    Category.findByIdAndUpdate(req.params.id, req.body, (err, doc)=> {
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
    Category.findByIdAndRemove(req.params.id, (err, doc)=> {
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