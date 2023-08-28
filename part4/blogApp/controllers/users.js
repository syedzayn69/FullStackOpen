const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

userRouter.get("/", async (request, response) => {
  const allBlogs = await User.find({}).populate("blogs",{title: 1,author: 1,url: 1});
  response.json(allBlogs);
});

userRouter.get("/:id", async (request, response) => {
  const returnedBlog = await User.findById(request.params.id)
  response.json(returnedBlog)
})

userRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;
  if (password.length < 3) {
    return response
      .status(400)
      .json({ error: "Password should be 3 characters long." });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

module.exports = userRouter;
