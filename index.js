const dotenv = require('dotenv')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

dotenv.config()
const app = express()

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

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

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person
    .findById(id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const { body } = request
    const { name, number } = body

    const person = new Person({
      name,
      number
    })
    person
      .save()
      .then(savedPerson => savedPerson.toJSON())
      .then(savedAndFormattedPerson => {
        response.json(savedAndFormattedPerson)
      }) 
      .catch(error => next(error)) 
})

app.put('/api/persons/:id', (request, response, next) => {
  const { body } = request
  const { name, number } = body
  const id = request.params.id

  const person = {
    name,
    number
  }
  Person
    .findByIdAndUpdate(id, person, { new: true})
    .then(updatedPerson => {
      console.log(updatedPerson)
      response.json(updatedPerson)
    })
    .catch(error => next(error))
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
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})