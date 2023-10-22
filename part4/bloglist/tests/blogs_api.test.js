const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken')



const api = supertest(app)

let token


beforeEach(async () => {

  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('secret', 10)
  const user = new User({username: 'root', passwordHash})

  await user.save()

  const userForToken = {
    username: user.username,
    id: user.id
  }

  token = jwt.sign(userForToken, process.env.SECRET)


  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('all blogs are returned', async () => {

  const response = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`)

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('unique identifier property is "id" in the JSON representation', async () => {

  
  const blog = await Blog.findOne({ title: "ACL injuries" });

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
  .set({Authorization: `Bearer ${token}`})
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
    .set({Authorization: `Bearer ${token}`})
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
  .set({Authorization: `Bearer ${token}`})
  .expect(400)
  .expect('Content-Type', /application\/json/)


  const blogAtEnd = await helper.blogsInDb()

  expect(blogAtEnd).toHaveLength(helper.initialBlogs.length)

})

test('deleting a single blog post resource is successful', async () => {

  const blogAtStart = await helper.blogsInDb()

  const blogToDelete = {
    title: "Delete me",
    author: "someone",
    url: "delete.com",
    likes: 1
  }

  const result = await api
      .post('/api/blogs')
      .send(blogToDelete)
      .set('Authorization', `Bearer ${token}`)
      

  await api
  .delete(`/api/blogs/${result.body.id}`)
  .set({Authorization: `Bearer ${token}`})
  .expect(204)

  const blogAtEnd = await helper.blogsInDb()

  expect(blogAtEnd).toEqual(blogAtStart)

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
  .set({Authorization: `Bearer ${token}`})
  .expect(200)
  .expect('Content-Type', /application\/json/)
  
  expect(response.body.likes).toBe(updateLikes)
})



afterAll( async () => {
  await mongoose.connection.close()
})
