import { Router } from "express";

import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../middleware/verifyToken.js";
import { updateUser, deleteUser, findUser, findAllUsers, userStats } from "../controllers/user.js";

const router = Router();

router.put('/:id', verifyTokenAndAuthorization, updateUser);
router.delete('/:id', verifyTokenAndAuthorization, deleteUser); 
router.get('/find/:id', verifyTokenAndAdmin, findUser);
router.get('/', verifyTokenAndAdmin, findAllUsers);
router.get('/stats', verifyTokenAndAdmin, userStats);

export default router;