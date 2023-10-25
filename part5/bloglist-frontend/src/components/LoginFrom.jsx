import { useEffect, useState } from "react"
import loginService from '../services/login'
import blogService from '../services/blog'

const LoginForm = ({setUser, setNotificationMessage, setError}) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  })


  const login = async  (event) => {
    event.preventDefault()


    try {
      const user = await loginService.login({username, password})


      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      setUser(user)
      setUsername('')
      setPassword('')
    }

    catch (exception) {
      setNotificationMessage('Wrong username or password')
      setError(true)

      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }

  }


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
            onChange={({target}) => setUsername(target.value)}
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
            onChange={({target}) => setPassword(target.value)}
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