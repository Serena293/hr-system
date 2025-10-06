/**
 * Defines authentication routes (login only).
 * No registration route is provided, as users cannot self-register.
 * This route is public and does not require authentication middleware.
 */

import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const router = Router();
const authController = new AuthController();

router.post("/login", (req, res) => authController.login(req, res));


export default router;
