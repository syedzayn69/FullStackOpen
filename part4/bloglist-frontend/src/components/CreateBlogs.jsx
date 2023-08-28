import { useState } from "react";

const CreateBlogs = ({ blogSubmitFn }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const blogSubmit = (event) => {
    event.preventDefault();
    setAuthor("");
    setTitle("");
    setUrl("");

    blogSubmitFn({
      title,
      author,
      url,
    })
  };

  return (
    <form onSubmit={blogSubmit}>
      <div>
        Title:{" "}
        <input
          type="text"
          required
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          name="title"
        />
      </div>
      <div>
        Author:{" "}
        <input
          type="text"
          required
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          name="author"
        />
      </div>
      <div>
        url:{" "}
        <input
          type="text"
          required
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          name="url"
        />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateBlogs;
