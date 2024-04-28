const request = require("supertest");
const app = require("../../app");

describe("Test GET /launches", () => {
  test("It should respond with 200 success", async () => {
    const response = await request(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

describe("Test POST /launches", () => {
  const completeLaunchData = {
    mission: "ZTM102",
    rocket: "ZTM Experimental IS2",
    target: "Kepler-186 f",
    launchDate: "4 May 2033",
  };

  const launchDataWithoutDate = {
    mission: "ZTM102",
    rocket: "ZTM Experimental IS2",
    target: "Kepler-186 f",
  };

  const launchDataWithInvalidDate = {
    mission: "ZTM102",
    rocket: "ZTM Experimental IS2",
    target: "Kepler-186 f",
    launchDate: "This date",
  };

  test("It should respond with 201 success", async () => {
    const response = await request(app)
      .post("/launches")
      .send(completeLaunchData)
      .expect("Content-Type", /json/)
      .expect(201);

    const requestDate = new Date(completeLaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();
    expect(responseDate).toBe(requestDate);

    expect(response.body).toMatchObject(launchDataWithoutDate);
  });

  test("It should catch missing required properties", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDataWithoutDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Missing required launch property",
    });
  });

  test("It should catch invalid dates", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDataWithInvalidDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Invalid launch date",
    });
  });
});

describe("Test DELETE /launches", () => {
  test("It should abort launch", async () => {
    const response = await request(app).delete("/launches/100").expect(200);
  });

  test("It should catch missing launchId", async () => {
    const response = await request(app).delete("/launches/140").expect(404);

    expect(response.body).toStrictEqual({
      error: "Launch not found",
    });
  });
});
