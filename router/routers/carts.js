import {Router} from "express";
import CartController from "../../controller/cart-controller";

const router = Router();
const cartCtrl = new CartController();

router.post('/', cartCtrl.create);
router.get('/', cartCtrl.getAll);
router.get('/:id', cartCtrl.getOne);
router.put('/：id', cartCtrl.update);
router.delete('/:id', cartCtrl.delete);

module.exports = router;