import { useState } from 'react'



const Blog = ({ blog, user, updateLikes, removeBlog }) => {

  const [fullBlog, setFullblog] = useState(false)


  const blogStyle = {
    paddingTop: 8,
    paddingLeft: 4,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleFullBlog = () => {
    setFullblog(!fullBlog)
  }

  // const showDelete = blog.user && blog.user.name === user.name;

  const showDelete = blog && blog.user && blog.user.name === user.name

  if (fullBlog) {
    return (
      <div style={blogStyle} className='blogPost'>
        <p className='title-author'>{blog.title} {blog.author} <button onClick={toggleFullBlog}> hide </button>
        </p>
        <p className='url'>
          {blog.url}
        </p>
        <p className='likes'>
          {blog.likes} 
          <button onClick={() => updateLikes(blog.id)} className='like-button'>
            likes
          </button>
        </p>
        {blog.user && blog.user.name && <p className='user'>{blog.user.name}</p>}
        {
          showDelete
            ? (
              <p>
                <button onClick={() => removeBlog(blog.id)} className='remove-blog'>remove</button>
              </p>
            )
            : ''
        }

      </div>
    )
  }

  

  return (
    <div className='blogPost'>
      <p style={blogStyle} className='title-author'>
        {blog.title} {blog.author} <button onClick={toggleFullBlog}> view </button>
      </p>
    </div>
  )
}


export default Blog



