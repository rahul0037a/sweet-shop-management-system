import { Sweet } from "./sweet.model";

export class SweetService {
  async create(data: any) {
    return Sweet.create(data);
  }

  async getAll() {
    return Sweet.find();
  }

  async search(query: any) {
    const { name, category, minPrice, maxPrice } = query;

    const filter: any = {};

    if (name) filter.name = { $regex: name, $options: "i" };
    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    return Sweet.find(filter);
  }

  async update(id: string, data: any) {
    return Sweet.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    return Sweet.findByIdAndDelete(id);
  }
}
