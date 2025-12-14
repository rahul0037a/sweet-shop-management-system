import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" }
});

export const User = mongoose.model("User", userSchema);

export class AuthService {
  async register(email: string, password: string, role: string = "user") {
    const exists = await User.findOne({ email });
    if (exists) throw new Error("User exists");

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashed,
      role
    });

    return user;
  }

  async login(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid credentials");

    const match = await bcrypt.compare(password, user.password!);
    if (!match) throw new Error("Invalid credentials");

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return { 
  token,
  role: user.role   // ⬅ important!
};

  }
}
