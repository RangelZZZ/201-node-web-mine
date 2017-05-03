import {Router} from "express";
import ItemController from "../../controller/item-controller";


const router = Router();
const itemCtrl = new ItemController();

router.get('/', itemCtrl.getAll);
router.get('/:id', itemCtrl.getOne);
router.post('/', itemCtrl.create);
router.put('/:id', itemCtrl.update);
export default router;