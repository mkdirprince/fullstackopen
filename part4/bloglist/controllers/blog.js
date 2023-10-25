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




  blogRouter.post('/',  async (request, response) => {
    const body = request.body;


      // extracted away in the userExtractor middleware

      // const decodedToken = jwt.verify(request.token, process.env.SECRET)

      // if (!decodedToken.id) {
      //   return response.status(401).json({error: 'token invalid'})
      // }
  
    // You already have the user attached to the request object
    const user = request.user;
  
    if (!user) {
      return response.status(401).json({ error: 'Operation not permitted' });
    }
  
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id,
    });
  
    const savedBlog = await blog.save();
  
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
  
    response.status(201).json(savedBlog);
  });
  



blogRouter.put('/:id', async (request, response) => {

  const {title, author, url, likes} = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, {title, author, url, likes}, {new: true})

  response.json(updatedBlog)

})

blogRouter.delete('/:id',  async (request, response) => {

  //Extracted away using the userExtractor middleware

  // const decodedToken = jwt.verify(request.token, process.env.SECRET)

  // if (!decodedToken.id) {
  //   return response.status(401).json({error: 'token invalid'})
  // }

  // const user = await User.findById(decodedToken.id)

  const user = request.user


  const blogToDelete = await Blog.findById(request.params.id)

  if (!user || blogToDelete.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  user.blogs = user.blogs.filter(b => b.toString() !== blogToDelete.id.toString() )

  await user.save()
  await blogToDelete.remove()
  
  response.status(204).end()

})


module.exports = blogRouter