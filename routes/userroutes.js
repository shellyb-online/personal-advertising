import {Router} from "express";
import { deleteUserProfile, getProfile, updateUserProfile, userLogin, userLogout, userRegister } from "../controllers/userControllers.js";
import { isauthenticated } from "../middlewares/auth.js";





const userRouter = Router();

userRouter.post("/users/register", userRegister);

userRouter.post("/users/login", userLogin);

userRouter.get("/users/me", isauthenticated, getProfile);

userRouter.delete("/users/delete", isauthenticated, deleteUserProfile);

userRouter.patch("/users/update", isauthenticated, updateUserProfile);

userRouter.post("/users/logout", isauthenticated, userLogout);


export default userRouter;
