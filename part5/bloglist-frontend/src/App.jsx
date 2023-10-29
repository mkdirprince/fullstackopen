import { useState, useEffect, useRef } from 'react'
import blogService from './services/blog'
import loginService from './services/login'

import Blogs from './components/Blogs'
import LoginForm from './components/LoginFrom'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [error, setError] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => {
        setBlogs(blogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const addBlog = async (newObject) => {

    blogFormRef.current.toggleVisibility()

    try {
      const savedBlog = await blogService.create(newObject)

      setBlogs(blogs.concat(savedBlog))

      setNotificationMessage(` a new blog "${newObject.title}" by ${newObject.author}`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)

    }

    catch (exception) {
      console.log('unathorised acces')
      setNotificationMessage('unable to add blog')
      setTimeout( () => {
        setNotificationMessage(null)
      }, 400)
    }

  }

  const updateLikes = async (id) => {

    const blog = blogs.find(blog => blog.id === id)

    const updatedBlog = {
      ...blog,
      likes: blog.likes += 1
    }

    try {
      const savedBlog = await blogService.update(id, updatedBlog)

      setBlogs(blogs.map(blog => blog.id !== id ? blog : savedBlog))
    }

    catch (exception) {
      console.log('error updating')
    }
  }


  const removeBlog = async (id) => {

    const blog = blogs.find(blog => blog.id === id)

    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}`)) {
      try {
        await blogService.remove(id)

        setBlogs(blogs.filter(blog => blog.id !== id))

        setNotificationMessage(`${blog.title} deleted successfully`)

        setTimeout( () => {
          setNotificationMessage(null)
        }, 5000)

      } catch (exception) {
        console.error('Error while removing the blog:', exception)
        setNotificationMessage(`unable to delete ${blog.title}`)
      }
    }
  }


  const login = async  (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })


      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
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

  const logout = () => {
    window.localStorage.clear()
    setUser(null)
  }


  const blogFormRef = useRef()

  const blogForm = () => {
    return (
      <>
        <Toggleable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm
            createBlog={addBlog}
          />
        </Toggleable>
      </>
    )
  }


  if (user === null) {
    return (
      <>
        <h2>log in to application</h2>
        <Notification message={notificationMessage} error={error}/>
        <LoginForm
          setUser={setUser}
          login={login}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
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
      {blogForm()}
      <Blogs blogs={blogs} user={user} updateLikes={updateLikes} removeBlog={removeBlog}/>
    </>
  )
}

export default App
