import {Router} from "express";
import ItemController from "../../controller/item-controller";


const router = Router();
const itemCtrl = new ItemController();

router.get('/', itemCtrl.getAll);
router.get('/:id', itemCtrl.getOne);
router.post('/', itemCtrl.create);
router.put('/:id', itemCtrl.update);
router.delete('/:id', itemCtrl.delete);

export default router;