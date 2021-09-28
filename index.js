require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('build'))

morgan.token('type', (req, res) => req.headers['request-body'])

app.get('/info', (request, response, next) => {
  Person
    .countDocuments()
    .then(count => {
      response.send(
        `<p>Phonebook has info for ${count} people</p>
        <p>${new Date()}</p>`
      );
    })
    .catch(error => next(error))
})

app.get('/api/persons', (request, response) => {
  Person
    .find({})
    .then(persons => response.json(persons))
})

app.post('/api/persons', (request, response) => {
    const { body } = request
    const { name, number } = body

    if(!name || !number) {
        return response.status(400).json({ 
            error: 'content missing' 
        })
    }
    // if(persons.map(person => person.name).includes(name)) {
    //     return response.status(409).json({
    //         error: `${name} already exists`
    //     })
    // }
    const person = new Person({
        name,
        number
    })
    person
      .save()
      .then(savedPerson => {
        console.log(savedPerson)
        response.json(savedPerson)
      })
    
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person
      .findByIdAndRemove(id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})