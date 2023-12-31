const jwt = require("jsonwebtoken");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const allBlogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  response.json(allBlogs);
});

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

blogsRouter.post("/", async (request, response) => {
  const { title, author, url, likes } = request.body;

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  const user = await User.findById(decodedToken.id);
  if(user === null) response.status(401).json({error: "Unauthorized access!"})

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id.toString(),
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id.toString());
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const { title, author, url, likes } = request.body;
  const blog = await Note.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    { new: false, runValidators: true, context: "query" }
  );
  response.status(201).json(blog);
});

module.exports = blogsRouter;
