import Blog from "./Blog"

const Blogs = ({ blogs, user, updateLikes, removeBlog }) => {
  return (
    <>
      {blogs.sort((a, b) => a.likes - b.likes).map(blog =>
        <Blog key={blog.id} blog={blog} user={user} updateLikes={updateLikes} removeBlog={removeBlog}/>
      )}
    </>
  )
}

export default Blogs