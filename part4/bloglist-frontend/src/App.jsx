import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogServices from "./services/blogs";
import loginSevices from "./services/login";
import LoginForm from "./components/LoginForm";
import Toggleable from "./components/Toggleable";
import CreateBlogs from "./components/CreateBlogs";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notify, setNotify] = useState(false);
  const [notifMessage, setNotifMessage] = useState("");
  const [notifState, setNotifState] = useState("");

  useEffect(() => {
    blogServices.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    let userInfo = window.localStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);
    setUser(userInfo);
  }, []);

  const loginSubmitFn = async (event) => {
    event.preventDefault();
    setUsername("");
    setPassword("");

    const newObj = { username, password };
    try {
      const userInfo = await loginSevices.login(newObj);

      window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
      setUser(userInfo);

      setNotifMessage("Login Successful!");
      setNotifState("green");
      setNotify(true);
      setTimeout(() => {
        setNotify(false);
      }, 3000);
    } catch {
      setNotifMessage("wrong username or password");
      setNotifState("red");
      setNotify(true);
      setTimeout(() => {
        setNotify(false);
      }, 3000);
    }
  };

  const logoutFn = () => {
    window.localStorage.removeItem("userInfo");
    setUser(null);
  };

  const blogSubmitFn = (blogObj) => {
    blogServices.setToken(user.token);
    blogServices
      .createBlog(blogObj)
      .then((response) => {
        console.log(response)
        setBlogs(blogs.concat(response));
        setNotifMessage(`a new blog ${response.title} by ${response.author} added!`);
        setNotifState("green");
        setNotify(true);
        setTimeout(() => {
          setNotify(false);
        }, 3000);
      })
      .catch((error) => {
        if (error.response.data.error === "token expired") {
          setNotifMessage("SESSION EXPIRED!");
          setNotifState("red");
          setNotify(true);
          setTimeout(() => {
            setNotify(false);
          }, 3000);
        }
      });
  };

  const blogListFn = () => {
    const allBlogs = blogs.map((blog) => <Blog key={blog.id} blog={blog} />);
    return (
      <div>
        <p>
          {user.username} is logged in{" "}
          <button onClick={logoutFn}>Log out</button>
        </p>
        <h2>create new</h2>
        <Toggleable buttonLabel={"Create Blogs!"}>
          {<CreateBlogs blogSubmitFn={blogSubmitFn} />}
        </Toggleable>
        <div>{allBlogs}</div>
      </div>
    );
  };

  return (
    <div>
      <h1>Blogs</h1>
      {notify && <Notification state={notifState} message={notifMessage} />}
      {!user ? (
        <LoginForm
          handleLogin={loginSubmitFn}
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
      ) : (
        blogListFn()
      )}
    </div>
  );
};

export default App;
