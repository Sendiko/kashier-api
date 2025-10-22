import AdminController from "../controller/admin_controller.js";
import express from "express";
const router = express.Router();

router.post("/api/v3/login", AdminController.login);

export default router;