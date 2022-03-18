import { Router } from "express";

import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../middleware/verifyToken.js";
import { createCart, deleteCart, findAllCarts, findUserCart, updateCart } from "../controllers/cart.js";

const router = Router();

router.post('/', verifyToken, createCart);
router.put("/:id", verifyTokenAndAuthorization, updateCart);
router.delete("/:id", verifyTokenAndAuthorization, deleteCart);
router.get('/find/:userID', verifyTokenAndAuthorization, findUserCart);
router.get('/', verifyTokenAndAdmin, findAllCarts);
export default router;