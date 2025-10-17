
import express from "express";
import UserController from "../controller/user_controller.js"; 
import ItemController from "../controller/item_controller.js";
import HistoryController from "../controller/history_controller.js";
const router = express.Router();

router.get("/api/v1/user", UserController.index);
router.get("/api/v1/user/:id", UserController.show);
router.post("/api/v1/user", UserController.store);
router.put("/api/v1/user/:id", UserController.update);
router.delete("/api/v1/user/:id", UserController.delete);

router.get("/api/v1/item", ItemController.index);
router.get("/api/v1/item/:userId", ItemController.show);
router.post("/api/v1/item", ItemController.store);
router.put("/api/v1/item/:id", ItemController.update);
router.delete("/api/v1/item/:id", ItemController.delete);

router.get("/api/v1/history", HistoryController.index);
router.get("/api/v1/history/:userId", HistoryController.show);
router.post("/api/v1/history", HistoryController.store);
router.put("/api/v1/history/:id", HistoryController.update);
router.delete("/api/v1/history/:id", HistoryController.delete);

export default router;