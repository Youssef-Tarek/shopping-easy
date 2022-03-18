import { Router } from "express";

import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../middleware/verifyToken.js";
import { createProduct, updateProduct, deleteProduct, findProduct, findProducts } from "../controllers/product.js";

const router = Router();

router.post('/', verifyTokenAndAdmin, createProduct);
router.put("/:id", verifyTokenAndAdmin, updateProduct);
router.delete("/:id", verifyTokenAndAdmin, deleteProduct);
router.get('/find/:id', findProduct);
router.get('/', verifyTokenAndAdmin, findProducts);
export default router;