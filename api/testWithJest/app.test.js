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

    test("should specify text in the content type header", async () => {
      const response = await supertest(server)
        .post("/activities")
        .send({
          name: "ActivityTest2",
          difficulty: "3",
          duration: "3",
          season: "Autumn",
          countries: ["ARG"],
        });
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("text")
      );
    });
    test("should respond with a text with a success message", async () => {
      const res = await supertest(server)
        .post("/activities")
        .send({
          name: "ActivityTest3",
          difficulty: "3",
          duration: "3",
          season: "Autumn",
          countries: ["IOT"],
        });
      expect(res.text).toBe("Activity created successfully");
    });
  });

  describe("when the user does not pass all the data", () => {
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
  describe("when the user tries to create an activity that already exists", () => {
    test("should respond with a 400 status code", async () => {
      const bodyData = [
        {
          name: "ActivityTest",
          difficulty: "3",
          duration: "3",
          season: "Autumn",
          countries: ["TWN", "ATF", "COL"],
        },
        {
          name: "ActivityTest2",
          difficulty: "3",
          duration: "3",
          season: "Autumn",
          countries: ["ARG"],
        },
      ];
      for (const body of bodyData) {
        const response = await supertest(server).post("/activities").send(body);
        expect(response.status).toBe(400);
        expect((res) => {
          expect(res.body).to.eql(
            "The activity was already created, try with a new one"
          );
        });
      }
    });
  });
});
