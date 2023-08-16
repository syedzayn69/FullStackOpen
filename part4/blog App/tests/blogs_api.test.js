const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const BlogUser = require("../models/user");
const helper = require("./helper")
const bcrypt = require("bcrypt");

const api = supertest(app);

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObj = blogs.map((elem) => new Blog(elem));
  const promiseArr = blogObj.map((elem) => elem.save());
  await Promise.all(promiseArr);
});

test("notes are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const returnedPromise = await api.get("/api/blogs");
  const noteList = returnedPromise.body.map((elem) => elem.content);
  expect(noteList.length).toBe(blogs.length);
});

test("check unique id", async () => {
  const response = await api.get("/api/blogs");
  const id = response.body[0].id;
  console.log(id);
  expect(id).toBeDefined();
}, 300000);

test("test create new blog", async () => {
  const newBlog = {
    title: "King of Serbia",
    author: "J.J Blazkovich",
    url: "http://GG-XYZ.com",
    likes: 123,
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  expect(response.body.length).toBe(blogs.length + 1);
});

test("check deletion", async () => {
  const blogList = await api.get("/api/blogs");
  const blogToDelete = blogList.body[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const response = await api.get("/api/blogs");
  expect(response.body.length).toBe(blogs.length - 1);
}, 300000);

test("test updating a blog", async () => {
  const response = await api.get("/api/blogs");
  const blog = response.body[0];
  const newObj = {
    title: "String",
    author: "String",
    url: "String",
    likes: 2,
  };
  api.put(`/api/blogs/${blog.id}`).send(newObj).expect(201);
}, 300000);

describe("Users Tests", () => {
  beforeEach(async () => {
    await BlogUser.deleteMany({});

    const passwordHash = await bcrypt.hash("secret", 10);
    const user = new BlogUser({
      username: "root",
      name: "superUser",
      passwordHash,
    });

    await user.save();
  });

  test("check creation of a new user", async() => {
    const userAtStart = await helper.usersInDb()

    const newUser = {
      username: "Volva",
      name: "Swegen",
      password: "Syed123"
    }

    await api
    .post("/api/users")
    .send(newUser)
    .expect(201)
    .expect("Content-Type",/application\/json/)

    const userAtEnd = await helper.usersInDb()
    expect(userAtEnd).toHaveLength(userAtStart.length + 1)

    const usernames = userAtEnd.map(elem => elem.username)
    expect(usernames).toContain(newUser.username)
  })

  test("check validations", async () => {
    const userAtStart = await helper.usersInDb()

    const newUser = {
      username: "root",
      name: "superUser",
      password: "123"
    }
    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type",/application\/json/)

    expect(result.body.error).toContain("expected `username` to be unique")

    const userAtEnd = await helper.usersInDb()
    expect(userAtEnd).toEqual(userAtStart)
  })

  test("check username and passwords length is correct", async () => {
    const userAtStart = await helper.usersInDb()

    const newUser = {
      username: "Ro",
      name: "SuperUser",
      password: "123"  
    }

    const wrongBlog = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type",/application\/json/)

  expect(wrongBlog.body.error).toContain('shorter than the minimum allowed length')

  const userAtEnd = await helper.usersInDb()
  expect(userAtStart).toEqual(userAtEnd)


  })
});

afterAll(async () => {
  await mongoose.connection.close();
});
