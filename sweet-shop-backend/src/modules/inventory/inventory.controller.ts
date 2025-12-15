import { Request, Response } from "express";
import { Sweet } from "../sweets/sweet.model";
import { AuthRequest } from "../../middleware/auth"; 


export class InventoryController {
  async purchase(req: Request, res: Response) {
    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) return res.status(404).json({ error: "Not found" });
    if (sweet.quantity! <= 0) return res.status(400).json({ error: "Out of stock" });

    sweet!.quantity! -= 1;
    await sweet.save();

    res.json({ message: "Purchased", sweet });
  }

  async restock(req: Request, res: Response) {
    const { amount } = req.body;
    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) return res.status(404).json({ error: "Not found" });

    sweet.quantity += amount || 1;
    await sweet.save();

    res.json({ message: "Restocked", sweet });
  }
  async checkout(req: AuthRequest, res: Response) {
  try {
    const items = req.body.items;

    for (let item of items) {
      const sweet = await Sweet.findById(item.sweetId);

      if (!sweet) throw new Error("Sweet not found");

      if (sweet.quantity < item.quantity)
        throw new Error(`${sweet.name} has insufficient stock`);

      sweet.quantity -= item.quantity;
      await sweet.save();
    }

    res.json({ message: "Checkout successful" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

}
