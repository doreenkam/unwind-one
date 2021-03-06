const request = require("supertest");
const app = require("../app");

describe("API Server", () => {
  let api;
  beforeAll(() => {
    api = app.listen(5001, () => {
      console.log("Test server running at port 5001!");
    });
    //test server listening at 5000 hardcoded.
  });
  afterAll((done) => {
    api.close(done);
    console.log("Gracefully stopping test server");
    // no artifacts jangling
  });
  it("responds to get / with a status of 200", (done) => {
    request(api).get("/").expect(200, done);
  });
  it("retrieves a random quote by id", (done) => {
    request(api).get("/posts/2").expect(200, done);
  });

  it("writeJSON works", (done) => {
    request(api).get("/posts").expect("Content-Type", /json/).expect(200, done);
  });

  it("readJSON works", (done) => {
    request(api)
      .post("/posts")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });

  it("find new post", (done) => {
    request(api).get("/posts/findpost").expect(200, done);
  });

  it("finds post with specified id", (done) => {
    request(api)
      .get("/posts/findpost")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });

  it("readJSON and writeJSON functioning", (done) => {
    request(api)
      .post("/posts/newpost")
      .expect("Content-Type", /html/, done)
  });

  it("return comments", (done) => {
    request(api).post("/posts/newpost").expect("Content-Type", /html/, done)
  });

});
