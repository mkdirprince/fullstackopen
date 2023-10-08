// import express library
const express = require('express')
const app = express()

app.use(express.json())


// persons array for storing phonebook contacts
let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

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
  response.json(persons)
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

// helper function for generating id
const generateId = () => {
  return Math.floor(Math.random() * 1000)
}


// route for adding a person to the persons array
app.post('/api/persons', (request, response) => {
  const body = request.body 

  if (!body || !body.name || !body.number) {
    return response.status(400).json({
      error: 'missing content'
    })
  }
  else if (persons.some(person => person.name === body.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)
  response.json(person)

})


// route for deleting a single person resource

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})


// declaring PORT and listening for changes
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
