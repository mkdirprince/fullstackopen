const Blog = ({blog}) => {
  return (
    <>
      <p>{blog.title} {blog.author}</p>
    </>
  )
}


const Blogs = ({blogs}) => {
  return (
    <>
      {blogs.map(blog => 
        <Blog key={blog.id} blog={blog}/>
      )}
    </>
  )
}

export default Blogs