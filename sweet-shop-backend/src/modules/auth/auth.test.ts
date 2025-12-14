import request from "supertest";
import app from "../../app";
import mongoose from "mongoose";

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/sweetshop-test");
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("Auth Tests", () => {
  test("should register a user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ email: "test@test.com", password: "123456" });

    expect(res.status).toBe(201);
    expect(res.body.email).toBe("test@test.com");
  });

  test("should login a user", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@test.com", password: "123456" });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
