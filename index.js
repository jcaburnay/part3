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
    },
    { 
      "id": 5,
      "name": "Jonathan Caburnay", 
      "number": "61-47-6288100"
    }
]

const randomIdGenerator = range => Math.floor(Math.random() * range)

app.get('/info', (request, response) => {
    response.send(
        `<p>Phonebook has info for ${persons.length} people</p>
         <p>${new Date()}</p>`
    );
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => response.json(persons))
})

app.post('/api/persons', (request, response) => {
    const { body } = request
    const { name, number } = body

    if(!name || !number) {
        return response.status(400).json({ 
            error: 'content missing' 
        })
    }
    if(persons.map(person => person.name).includes(name)) {
        return response.status(409).json({
            error: `${name} already exists`
        })
    }
    const person = {
        id: randomIdGenerator(1000),
        name,
        number
    }
    persons = persons.concat(person)
    console.log(person)
    response.json(person)
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

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})