const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach( async () => {
  await Blog.deleteMany({})

  await Blog.insertMany(helper.initialBlogs)
})

test('all blogs are returned', async () => {

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('unique identifier property is "id" in the JSON representation', async () => {

  
  const blog = await Blog.findOne({ title: "ACL injuries" }).exec();

  expect(blog.toJSON().id).toBeDefined();
})

test('a valid blog can be added', async () => {

  const newBlog = {
    title: "New treatment for ACL",
    author: "Yaw Mensah",
    url: "example.com",
    likes: 10
  }

  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(201)
  .expect('Content-Type', /application\/json/)

  const blogAtEnd = await helper.blogsInDb()
  expect(blogAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogAtEnd.map(blog => blog.title)
  expect(titles).toContain('New treatment for ACL')

})


test('likes property defaults to 0 if missing', async () => {

  const newBlog = {
    title: 'New Blog',
    author: 'Author',
    url: 'https://example.com',
  }

  const savedBlog = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  

  expect(savedBlog.body.likes).toBe(0)
})

test('return status code 400 Bad Request if title or url is missing', async () => {

  const newBlog = {
    title: 'No url',
    author: "Someone",
    likes: 1
  }

  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(400)


  const blogAtEnd = await helper.blogsInDb()

  expect(blogAtEnd).toHaveLength(helper.initialBlogs.length)

})

test(' deleting a single blog post resource is successful', async () => {

  const blogAtStart = await helper.blogsInDb()

  const blogToDelete = blogAtStart[0]

  await api
  .delete(`/api/blogs/${blogToDelete.id}`)
  .expect(204)

  const blogAtEnd = await helper.blogsInDb()

  expect(blogAtEnd).toHaveLength(helper.initialBlogs.length - 1)

  const titles = blogAtEnd.map(blog => blog.title)

  expect(titles).not.toContain(blogToDelete.title)

})

test(' successful update the information of an individual blog post', async () => {

  const blogAtStart = await helper.blogsInDb()

  const blogToUpdate = blogAtStart[0]

  const updateLikes = 9

  const updatedBlog = {
    ...blogToUpdate,
    likes: updateLikes
  }

  const response = await api
  .put(`/api/blogs/${updatedBlog.id}`)
  .send(updatedBlog)
  .expect(200)
  .expect('Content-Type', /application\/json/)
  
  expect(response.body.likes).toBe(updateLikes)
})



afterAll( async () => {
  await mongoose.connection.close()
})