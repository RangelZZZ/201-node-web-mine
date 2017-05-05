const async = require("async");
const category = require("../model/category");
const constant = require("../config/constant");

export default class CategoryController {
  create(req, res, next) {
    category.create(req.body, (err, doc)=> {
      if (err) {
        return next(err);
      }
      res.status(constant.httpCode.CREATED).send({"categoryUri": `categories/${doc._id}`});
    })
  }

}