import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const service = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { email, password, role } = req.body;

      const user = await service.register(email, password, role);

      res.status(201).json(user);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await service.login(email, password);
      res.json(token);
    } catch (err: any) {
      res.status(401).json({ error: err.message });
    }
  }
}
