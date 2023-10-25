import { useState, useEffect } from "react"
import blogService from './services/blog'

import Blogs from './components/Blogs'
import LoginForm from "./components/LoginFrom"
import BlogForm from "./components/BlogForm"
import Notification from "./components/Notification"

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    blogService
    .getAll()
    .then(blogs => {
      setBlogs(blogs)
    })
  })

  const logout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  if (user === null) {
    return (
      <>
        <h2>log in to application</h2>
        <Notification message={notificationMessage} error={error}/>
        <LoginForm setUser={setUser} setNotificationMessage={setNotificationMessage} setError={setError}/>
      </>
    )
  }

  return (
    <>
      <h2>Blogs</h2>
      <Notification message={notificationMessage} error={error}/>
      <p>
        {user.username} logged in  
        <button type="button" onClick={logout}>
        Logout</button> 
      </p>
      <BlogForm blogs={blogs} setBlogs={setBlogs} setNotificationMessage={setNotificationMessage}/>
      <Blogs blogs={blogs}/>
    </>
  )
}

export default App
