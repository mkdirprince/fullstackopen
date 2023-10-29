
import { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const addBlog = async (event) => {
    event.preventDefault()


    createBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')

  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <p>
          <label htmlFor="title">
            title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
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
            onChange={({ target }) => setAuthor(target.value)}
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
            onChange={({ target }) => setUrl(target.value)}
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