
require('dotenv').config()

// import express library
const express = require('express')

// import morgan library
const morgan = require("morgan")

// import cors
const cors = require("cors")

// import the database
const Person = require('./models/person')

// custom token for logging the body of the post request
morgan.token('data', (request, response) => {
  return JSON.stringify(request.body)
})

// assign app to the express library to use
const app = express()

// use cors
app.use(cors())

//use express static middleware
app.use(express.static('dist'))

// use the expres built in json function
app.use(express.json())
// use morgan tiny predifined template
app.use(morgan('tiny'))

// use the custom morgan function to generate log
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))


// route for info 
app.get('/info', (request, response) => {
  
  const now = new Date()

  response.send(
    `<p>Phonebook has info for ${persons.length} people</p>
    <p>${now}</p>
    `
  )
})


// route for the getting all persons array for storing phonebook generated as json
app.get('/api/persons', (request, response) => {
  Person.find({}).then(people => {
    response.json(people)
  })
})


// route for getting a single person' resource using id from the persons array
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  }

  else {
    response.status(404).end()
  }
})




// route for adding a person to the persons array
app.post('/api/persons', (request, response) => {
  const body = request.body 

  if (!body) {
    return response.status(400).json({
      error: 'missing content'
    })
  }
  

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })

})


// route for deleting a single person resource

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})


// declaring PORT and listening for changes
const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
