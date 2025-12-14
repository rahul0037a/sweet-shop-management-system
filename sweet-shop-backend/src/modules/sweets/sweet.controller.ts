import { Request, Response } from "express";
import { SweetService } from "./sweet.service";

const service = new SweetService();

export class SweetController {
  async create(req: Request, res: Response) {
    try {
      const sweet = await service.create(req.body);
      res.status(201).json(sweet);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async getAll(req: Request, res: Response) {
    const sweets = await service.getAll();
    res.json(sweets);
  }

  async search(req: Request, res: Response) {
    const sweets = await service.search(req.query);
    res.json(sweets);
  }

  async update(req: Request, res: Response) {
    const updated = await service.update(req.params.id, req.body);
    res.json(updated);
  }

  async delete(req: Request, res: Response) {
    await service.delete(req.params.id);
    res.json({ message: "Sweet deleted" });
  }
}
