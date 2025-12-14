import { Router } from "express";
import { InventoryController } from "./inventory.controller";
import { authMiddleware, adminMiddleware } from "../../middleware/auth";

const router = Router();
const controller = new InventoryController();

router.post("/:id/purchase", authMiddleware, controller.purchase);
router.post("/:id/restock", authMiddleware, adminMiddleware, controller.restock);
router.post("/checkout", authMiddleware, controller.checkout);


export default router;
