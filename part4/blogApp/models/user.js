const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const BlogUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
    unique: true,
  },
  name: {
    type: String,
    minLength: 3,
  },
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});
BlogUserSchema.plugin(uniqueValidator);

BlogUserSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const BlogUser = mongoose.model("BlogUser", BlogUserSchema);
module.exports = BlogUser;
