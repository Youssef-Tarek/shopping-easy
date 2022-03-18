import { Router } from "express";

import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../middleware/verifyToken.js";
import { createOrder, deleteOrder, findAllOrders, findOrder, monthlyIncome, updateOrder } from "../controllers/order.js";

const router = Router();

router.post('/', verifyToken, createOrder);
router.put("/:id", verifyTokenAndAdmin, updateOrder);
router.delete("/:id", verifyTokenAndAdmin, deleteOrder);
router.get('/find/:userID', verifyTokenAndAuthorization, findOrder);
router.get('/', verifyTokenAndAdmin, findAllOrders);
router.get('/income', verifyTokenAndAuthorization, monthlyIncome);
export default router;