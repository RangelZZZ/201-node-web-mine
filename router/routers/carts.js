import {Router} from "express";
import CartController from "../../controller/cart-controller";

const router = Router();
const cartCtrl = new CartController();

router.post('/', cartCtrl.create);
router.get('/', cartCtrl.getAll);

module.exports = router;