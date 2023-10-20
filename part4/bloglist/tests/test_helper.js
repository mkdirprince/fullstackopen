const Blog = require('../models/blog')


const initialBlogs = [
  {
    title: "ACL injuries",
    author: "Prince Wilson",
    url: "www.example.com",
    likes: 6
  },

  {
    title: "MCL injuries",
    author: "Qwabs Wilson",
    url: "www.example.com",
    likes: 3
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb
}