import { Router } from "express";
import { methods as auth_tokenController } from "./../controllers/auth_token.controller";

const router = Router();

router.post("/login", auth_tokenController.authTokenRouter);
router.get("/profile", auth_tokenController.getAuthTokenRouter);
export default router;