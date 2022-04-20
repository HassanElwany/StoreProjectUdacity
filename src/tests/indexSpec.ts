import supertest from "supertest";
import app from "../server";

const request = supertest(app);

describe("test basic endpoint server", () => {
  it("get endpoint", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
  });
});
