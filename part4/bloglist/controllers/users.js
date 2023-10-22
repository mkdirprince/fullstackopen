const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')



usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  response.json(users)
})


usersRouter.post('/', async (request, response) => {

  const {name, username, password} = request.body

  if (!name || !password) {
    return response.status(400).json({error: "name or password is required"})
  }

  if (password.length < 3) {
    return response.status(400).json({error: "password must be at least 3 characters long"})
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)


  const user = new User({
    name,
    username,
    passwordHash
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)

})

module.exports = usersRouter