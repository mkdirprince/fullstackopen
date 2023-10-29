import {useState } from "react"



const Blog = ({blog, user, updateLikes, removeBlog}) => {

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

  const showDelete = blog.user.name === user.name

  if (fullBlog) {
    return (
      <div style={blogStyle}>
        <p>{blog.title} {blog.author} <button onClick={toggleFullBlog}> hide </button>
        </p>
        <p>
          {blog.url}
        </p>
        <p>
          {blog.likes} <button onClick={() => updateLikes(blog.id)}>likes</button>
        </p>
        <p>{blog.user.name}</p>
        {
          showDelete
          ? (
            <p>
              <button onClick={() => removeBlog(blog.id)}>remove</button>
            </p>
          )
          : ""
        }
        
      </div>
    )
  }

  return (
    <>
      <p style={blogStyle}>
        {blog.title} {blog.author} <button onClick={toggleFullBlog}> view </button>
      </p>
    </>
  )
}


const Blogs = ({blogs, user, updateLikes, removeBlog}) => {
  return (
    <>
      {blogs.sort((a, b) => a.likes - b.likes).map(blog => 
        <Blog key={blog.id} blog={blog} user={user} updateLikes={updateLikes} removeBlog={removeBlog}/>
      )}
    </>
  )
}

export default Blogs