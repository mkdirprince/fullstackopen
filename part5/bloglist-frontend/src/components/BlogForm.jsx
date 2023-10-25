import blogService from '../services/blog'

import { useState } from "react"

const BlogForm = ({blogs, setBlogs, setNotificationMessage}) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const createBlog= async (event) => {
    event.preventDefault()

    const newObject = {
      title: title,
      author: author,
      url: url
    }

    try {
      const savedBlog = await blogService.create(newObject)

      setBlogs(blogs.concat(savedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setNotificationMessage(` a new blog "${title}" by ${author}`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)

    }

    catch (exception) {
      console.log('unathorised acces')
    }

  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
        <p>
          <label htmlFor="title">
            title
          </label>
          <input 
            type="text" 
            name="title"
            id="title"
            value={title}
            onChange={({target}) => setTitle(target.value)}
          />
        </p>
        <p>
          <label htmlFor="author">
            Author
          </label>
          <input 
            type="author" 
            name="author"
            id="author"
            value={author}
            onChange={({target}) => setAuthor(target.value)}
          />
        </p>
        <p>
          <label htmlFor="url">
            url
          </label>
          <input 
            type="url" 
            name="url"
            id="url"
            value={url}
            onChange={({target}) => setUrl(target.value)}
          />
        </p>
        <p>
          <button type="submit"> create </button>
        </p>
      </form>
    </>
  )
}


export default BlogForm