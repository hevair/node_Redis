import { Router } from "express";
import { CreateUsersController } from "./controllers/CreateUsersController";
import { GetUserInforController } from "./controllers/GetUserInfoController";
import { LoginUserController } from "./controllers/LoginUserController";
import { authentication } from "./middleware/auth";

const router = Router();


router.post('/users',CreateUsersController.handle)
router.post('/login', LoginUserController.handle)
router.get('/users/profile',authentication,GetUserInforController.handle)


export default router;