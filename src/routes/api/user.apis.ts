import express, { Router } from 'express';
import userController from '../../controllers/user.controller';

const router: Router = express.Router();

router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
-
router.get("/users", userController.getAllUser);
router.get("/user/:id", userController.getUserId);

router.put("/edit-user/:id", userController.updateUser);

router.delete("/delete/:id", userController.deleteUser);

export default router;