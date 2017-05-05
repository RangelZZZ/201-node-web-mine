import {Router} from "express";
import CategoryController from "../../controller/category-controller";


const router = Router();
const categoryCtrl = new CategoryController();

router.post('/', categoryCtrl.create);
router.get('/:id', categoryCtrl.getOne);
router.get('/', categoryCtrl.getAll);
router.put('/:id', categoryCtrl.update);


module.exports = router;