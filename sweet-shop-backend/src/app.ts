import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";
import sweetRoutes from "./modules/sweets/sweet.routes";
import inventoryRoutes from "./modules/inventory/inventory.routes";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);
app.use("/api/sweets", inventoryRoutes);

export default app;
