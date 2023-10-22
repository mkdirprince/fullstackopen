const blogRouter = require('express').Router()
const Blog = require('../models/blog')


blogRouter.get('/', async (request, response) => {
  const blogs =  await Blog.find({}).populate('user')
  response.json(blogs)
})


//Helper function used to extract the token. This will be moved to its own middle ware

// const getTokenFrom = request => {
//   const authorization = request.get('authorization')

//   if (authorization && authorization.startsWith('Bearer ')) {
//     return authorization.replace('Bearer ', '')
//   }

//   return null
// }

blogRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.title || !body.url) {
    return response.status(400).send({error: 'missing content'})
  }

  // extracted away in the userExtractor middleware

  // const decodedToken = jwt.verify(request.token, process.env.SECRET)

  // if (!decodedToken.id) {
  //   return response.status(401).json({error: 'token invalid'})
  // }

  const user = request.user


  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})


blogRouter.put('/:id', async (request, response) => {

  const blog = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})

  response.json(updatedBlog)

})

blogRouter.delete('/:id', async (request, response) => {

  //Extracted away using the userExtractor middleware

  // const decodedToken = jwt.verify(request.token, process.env.SECRET)

  // if (!decodedToken.id) {
  //   return response.status(401).json({error: 'token invalid'})
  // }

  // const user = await User.findById(decodedToken.id)

  const user = request.user


  const blogToDelete = await Blog.findById(request.params.id)

  if (!blogToDelete) {
    return response.status(404).json({ error: 'blog not found' });
  }

  if (blogToDelete.user.toString() === user.id.toString()) {

    await Blog.findByIdAndRemove(request.params.id)

    return response.status(204).end()
  }

  else {
    return response.status(401).json({ error: 'unauthorized access' });
  }

})


module.exports = blogRouter