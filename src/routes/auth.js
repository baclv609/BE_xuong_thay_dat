import { Router } from "express";
import { getUserById, getUsers, login, resgister, updateUser } from "../controllers/auth";
import { validBodyRequest } from "../middleware/validBodyRequest";
import { loginSchema, registerSchema } from "../validSchema/auth";

const authRouter = Router();

authRouter.get("/", getUsers);
authRouter.get("/:id", getUserById);
authRouter.put("/:id", updateUser);


authRouter.post("/resgister", validBodyRequest(registerSchema), resgister);
authRouter.post("/login", validBodyRequest(loginSchema), login);

export default authRouter;