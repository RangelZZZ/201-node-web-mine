const async = require("async");
const category = require("../model/category");
const constant = require("../config/constant");

export default class CategoryController {
  create(req, res, next) {
    async.waterfall([(done)=> {
      const data = req.body;
      category.find({name: data.name}, (err, doc)=> {
        if (err) {
          return next(err);
        }
        if (doc.length !== 0) {
          return res.sendStatus(constant.httpCode.DUPLICATE_CONTENT);
        }
        done(null, data);
      })
    }, (data, done)=> {
      category.create(data, (err, doc)=> {
        if (err) {
          return next(err);
        }
        done(err, doc);
      })
    }], (err, doc)=> {
      if(err){
        return next(err);
      }
      res.status(constant.httpCode.CREATED).send({"categoryUri": `categories/${doc._id}`});
    })
  }

  getOne(req, res, next) {
    category.find(req.params.id, (err, doc)=> {
      if (err) {
        return next(err);
      }
      if (!doc) {
        res.sendStatus(constant.httpCode.NOT_FOUND);
      }

      res.status(constant.httpCode.OK).send(doc);
    })
  }

}