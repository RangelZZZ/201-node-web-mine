import {Router} from "express";
import CategoryController from "../../controller/category-controller";


const router = Router();
const categoryCtrl = new CategoryController();

router.post('/', categoryCtrl.create);
router.get('/:id', categoryCtrl.getOne);
router.get('/', categoryCtrl.getAll);
router.put('/:id', categoryCtrl.update);
router.delete('/:id', categoryCtrl.delete);
router.get('/:id/items', categoryCtrl.getItemsByCategoryId);


module.exports = router;