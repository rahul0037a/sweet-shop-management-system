import mongoose from "mongoose";

const sweetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: String,
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
});

export const Sweet = mongoose.model("Sweet", sweetSchema);
