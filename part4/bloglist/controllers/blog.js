const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs =  await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response, next) => {
  const body = request.body

  if (!body.title || !body.url) {
    return response.status(400).send({error: 'missing content'})
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })

  try {
    const savedBlog = await blog.save()

    response.status(201).json(savedBlog)
  }
  catch (exception) {
    next(exception)
  }
})


blogRouter.put('/:id', async (request, response, next) => {

  const blog = request.body

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})

    response.json(updatedBlog)
  }

  catch (exception) {
    next(exception)
  }

})

blogRouter.delete('/:id', async (request, response, next) => {

  try {
    await Blog.findByIdAndRemove(request.params.id)

    response.status(204).end()
  }

  catch (exception) {
    next(exception)
  }

})


module.exports = blogRouter