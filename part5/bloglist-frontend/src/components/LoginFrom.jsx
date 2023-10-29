
const LoginForm = ({ login, username, password, setUsername, setPassword }) => {


  return (
    <>
      <form onSubmit={login}>
        <p>
          <label htmlFor="username">
            username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </p>
        <p>
          <label htmlFor="password">
            password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </p>
        <p>
          <button type="submit">Login</button>
        </p>
      </form>
    </>
  )

}



export default LoginForm