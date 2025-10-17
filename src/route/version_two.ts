
import express from "express";
import UserController from "../controller/user_controller.js";
import ItemController from "../controller/item_controller.js";
import HistoryController from "../controller/history_controller.js";
import authenticateToken from "middleware/auth_middleware.js";
const router = express.Router();

router.put("/api/v2/user/:id", authenticateToken, UserController.update);
router.delete("/api/v2/user/:id", authenticateToken, UserController.delete);

router.get("/api/v2/item", authenticateToken, ItemController.index);
router.get("/api/v2/item/:userId", authenticateToken, ItemController.show);
router.post("/api/v2/item", authenticateToken, ItemController.store);
router.put("/api/v2/item/:id", authenticateToken, ItemController.update);
router.delete("/api/v2/item/:id", authenticateToken, ItemController.delete);

router.get("/api/v2/history", authenticateToken, HistoryController.index);
router.get("/api/v2/history/:userId", authenticateToken, HistoryController.show);
router.post("/api/v2/history", authenticateToken, HistoryController.store);
router.put("/api/v2/history/:id", authenticateToken, HistoryController.update);
router.delete("/api/v2/history/:id", authenticateToken, HistoryController.delete);

export default router;