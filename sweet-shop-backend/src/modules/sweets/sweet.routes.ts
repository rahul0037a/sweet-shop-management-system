import { Router } from "express";
import { SweetController } from "./sweet.controller";
import { authMiddleware, adminMiddleware } from "../../middleware/auth";

const router = Router();
const controller = new SweetController();

router.get("/", authMiddleware, controller.getAll);
router.get("/search", authMiddleware, controller.search);

router.post("/", authMiddleware, adminMiddleware, controller.create);
router.put("/:id", authMiddleware, adminMiddleware, controller.update);
router.delete("/:id", authMiddleware, adminMiddleware, controller.delete);

export default router;
