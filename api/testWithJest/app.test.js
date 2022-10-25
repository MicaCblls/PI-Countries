const supertest = require("supertest");
const server = require("../src/app");

describe("POST /activities", () => {
  describe("Given a name, a difficulty, a duration, a season and country/countries", () => {
    //should save the activity in the database

    test("should respond with a 201 status code", async () => {
      const response = await supertest(server)
        .post("/activities")
        .send({
          name: "ActivityTest",
          difficulty: "3",
          duration: "3",
          season: "Autumn",
          countries: ["TWN", "ATF", "COL"],
        });
      expect(response.status).toBe(201);
    });

    test("should specify json in the content type header", async () => {
      const response = await supertest(server)
        .post("/activities")
        .send({
          name: "ActivityTest",
          difficulty: "3",
          duration: "3",
          season: "Autumn",
          countries: ["ARG"],
        });
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
    test("should respond with a json object with the activity data", async () => {
      await supertest(server)
        .post("/activities")
        .send({
          name: "ActivityTest",
          difficulty: "3",
          duration: "3",
          season: "Autumn",
          countries: ["IOT"],
        });
      expect((res) => res.body.touristActivity.dataValues).toBeDefined();
    });
  });

  describe("when the user does not pass all the data", () => {
    //should respond with a 400 status code
    test("should respond with a 400 status code", async () => {
      const bodyData = [
        {
          name: "ActivityTest1",
          difficulty: "3",
          season: "Autumn",
        },
        {
          name: "ActivityTest2",
          difficulty: "3",
          duration: "2",
          season: "Autumn",
        },
        {},
      ];
      for (const body of bodyData) {
        const response = await supertest(server).post("/activities").send(body);
        expect(response.status).toBe(400);
        expect((res) => {
          expect(res.body).to.eql("Please enter all the data");
        });
      }
    });
  });
});
