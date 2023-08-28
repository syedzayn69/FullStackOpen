const LoginForm = ({
    handleLogin,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
}) => {
    return (
      <form onSubmit={handleLogin}>
        <h4>Login</h4>
        <div>
          Username:
          <input
            type="text"
            onChange={handleUsernameChange}
            name="Username"
            value={username}
          />
        </div>
        <div>
          Password:
          <input
            type="password"
            onChange={handlePasswordChange}
            name="Password"
            value={password}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    )
  }

  export default LoginForm