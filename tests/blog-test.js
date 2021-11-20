const request = require("supertest");
const expect = require("chai").expect;

const app = require("../index");

const blogPosts = [
  {
    title: "Blog 1",
    content: "Lorem ipsum dolor sit amet",
    tags: ["coding"],
    author: {
      firstName: "Ali",
      lastName: "Hasan",
      age: 23,
      gender: "Male",
      nationality: "Iraqi",
      areasOfExpertise: ["engineering", "Tech", "Science"],
    },
  },
  {
    title: "Design Blog 1",
    content: "Lorem ipsum dolor sit amet",
    tags: ["design"],
    author: {
      firstName: "Huda",
      lastName: "Duda",
      age: 25,
      gender: "Female",
      nationality: "Iraqi",
      areasOfExpertise: ["engineering"],
    },
  },
  {
    title: "Design Blog 2",
    content: "Lorem ipsum dolor sit amet",
    tags: ["design"],
    author: {
      firstName: "Huda",
      lastName: "Duda",
      age: 25,
      gender: "Female",
      nationality: "Iraqi",
      areasOfExpertise: ["engineering"],
    },
  },
  {
    title: "Design Blog 3",
    content: "Lorem ipsum dolor sit amet",
    tags: ["coding"],
    author: {
      firstName: "Lara",
      lastName: "Aydin",
      age: 25,
      gender: "Female",
      nationality: "Iraqi",
      areasOfExpertise: ["engineering"],
    },
  },
];

let blogPostId;
let authorId;

describe("Creating blog posts", () => {
  it("POST /api/blogposts should create a new blog post and return it in the response", (done) => {
    request(app)
      .post("/api/blogposts")
      .set("Content-Type", "application/json")
      .send(blogPosts[0])
      .expect("Content-Type", /json/)
      .expect(201, (err, res) => {
        if (err) return done(err);
        expect(res.body.title).to.equal(blogPosts[0].title);
        expect(res.body.content).to.equal(blogPosts[0].content);
        expect(res.body.tags).to.deep.equal(blogPosts[0].tags);
        expect(res.body.author.name).to.equal(blogPosts[0].author.name);
        expect(res.body.author.age).to.equal(blogPosts[0].author.age);
        expect(res.body.author.gender).to.equal(blogPosts[0].author.gender);
        expect(res.body.author.nationality).to.equal(
          blogPosts[0].author.nationality
        );
        expect(res.body.author.areasOfExpertise).to.deep.equal(
          blogPosts[0].author.areasOfExpertise
        );
        blogPostId = res.body._id;
        authorId = res.body.author._id;
        done();
      });
  });

  it("POST /api/blogposts should create a new blog post for same author and return it in the response", (done) => {
    request(app)
      .post("/api/blogposts")
      .set("Content-Type", "application/json")
      .send(blogPosts[1])
      .expect("Content-Type", /json/)
      .expect(201, (err, res) => {
        if (err) return done(err);
        expect(res.body.title).to.equal(blogPosts[1].title);
        expect(res.body.content).to.equal(blogPosts[1].content);
        expect(res.body.tags).to.deep.equal(blogPosts[1].tags);
        expect(res.body.author.name).to.equal(blogPosts[1].author.name);
        expect(res.body.author.age).to.equal(blogPosts[1].author.age);
        expect(res.body.author.gender).to.equal(blogPosts[1].author.gender);
        expect(res.body.author.nationality).to.equal(
          blogPosts[1].author.nationality
        );
        expect(res.body.author.areasOfExpertise).to.deep.equal(
          blogPosts[1].author.areasOfExpertise
        );
        done();
      });
  });

  it("POST /api/blogposts should create a new blog post for same author and return it in the response", (done) => {
    request(app)
      .post("/api/blogposts")
      .set("Content-Type", "application/json")
      .send(blogPosts[2])
      .expect("Content-Type", /json/)
      .expect(201, (err, res) => {
        if (err) return done(err);
        expect(res.body.title).to.equal(blogPosts[2].title);
        expect(res.body.content).to.equal(blogPosts[2].content);
        expect(res.body.tags).to.deep.equal(blogPosts[2].tags);
        expect(res.body.author.name).to.equal(blogPosts[2].author.name);
        expect(res.body.author.age).to.equal(blogPosts[2].author.age);
        expect(res.body.author.gender).to.equal(blogPosts[2].author.gender);
        expect(res.body.author.nationality).to.equal(
          blogPosts[2].author.nationality
        );
        expect(res.body.author.areasOfExpertise).to.deep.equal(
          blogPosts[2].author.areasOfExpertise
        );
        done();
      });
  });
});

describe("Fetching blog posts", () => {
  it("GET /api/blogposts should fetch all created blog posts", (done) => {
    request(app)
      .get("/api/blogposts")
      .expect("Content-Type", /json/)
      .expect(200, (err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an("array");
        for (let i = 0; i < 3; i++) {
          expect(res.body[i].title).to.equal(blogPosts[i].title);
        }
        done();
      });
  });

  it("GET /api/blogposts/tags should get blog posts with similar tags", (done) => {
    request(app)
      .get(`/api/blogposts/tags/${blogPostId}`)
      .expect("Content-Type", /json/)
      .expect(200, (err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an("array");
        expect(res.body[0].title).to.equal("Blog 1");
        expect(res.body[1].tags).to.include("coding");
        done();
      });
  });

  it("GET /api/blogposts/utc should get the creation time of a documnt in GMT time", (done) => {
    request(app)
      .get(`/api/blogposts/utc/${blogPostId}`)
      .expect("Content-Type", /json/)
      .expect(200, (err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.a("string");
        done();
      });
  });
});

describe("Handling authors", () => {
  it("GET /api/authors should return all unique authors", (done) => {
    request(app)
      .get("/api/authors")
      .expect("Content-Type", /json/)
      .expect(200, (err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an("array");
        const authorfirstNames = res.body.map((author) => author.firstName);
        expect(authorfirstNames).to.include.members(["Huda", "Lara"]);
        done();
      });
  });

  it("GET /api/authors/fullname should return all unique authors fullnames", (done) => {
    request(app)
      .get("/api/authors/fullnames")
      .expect("Content-Type", /json/)
      .expect(200, (err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an("array");
        expect(res.body).to.include.members(["Huda Duda", "Lara Aydin"]);
        done();
      });
  });

  it("PUT /api/authors/:firstName should update author's full names on all matching blog posts", (done) => {
    request(app)
      .put("/api/authors/Huda")
      .set("Content-Type", "application/json")
      .expect("Content-Type", /json/)
      .send({ fullName: "Marwa Alex" })
      .expect(200, (err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it("GET /api/authors/areas/ should return all authors with similar areas of experitise", (done) => {
    request(app)
      .get(`/api/authors/areas/${authorId}`)
      .expect("Content-Type", /json/)
      .expect(200, (err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an("array");
        expect(res.body[0].firstName).to.equal("Ali");
        expect(res.body[1].areasOfExpertise).to.include("engineering");
        done();
      });
  });
});
