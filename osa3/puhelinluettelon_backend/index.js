const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

require('dotenv').config()
const Contact = require('./models/contacts')



app.use(express.json())
app.use(cors())

app.use(express.static('build'))

app.use(morgan((tokens, req, res) => {

  if (tokens.method(req,res) === 'POST') {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      tokens.res(req, res, 'body'), JSON.stringify(req.body)
    ].join(' ')
  }

  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
  ].join(' ')
}))


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

app.get('/api/persons', (req, res, next) => {
  Contact.find({}).then(contacts => {
    res.json(contacts)
  })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
  Contact.findById(req.params.id)
    .then(contact => {
      if (contact) {
        res.json(contact)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.get('/info', (req,res, next) => {
  Contact.count({}).then(count => {
    res.status(200).send(`
        <p>Phonebook has info for ${count} people</p>\n
        <p>${new Date()}</p>
        `)
  })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req,res,next) => {
  /*const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)

    res.status(204).end()*/
  //TODO: make it delete data from database
  const id = req.params.id
  //persons = persons.filter( p => p.id !== id)
  Contact.findByIdAndDelete(id)
    .then(result => {
      result.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res,next) => {
  /*const newId = Math.floor(Math.random() * 2**32)
    const body  = req.body
    const alreadyExists = persons.find(person => person.name === body.name)

    if (!body.name) {
        return res.status(400).json({
            error: 'name missing'
        })
    } else if (!body.number) {
        return res.status(400).json({
            error: 'number missing'
        })
    } else if (alreadyExists) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        id: newId,
        name: body.name,
        number: body.number
    }
    persons = persons.concat(person)
    res.json(person)*/
  const body = req.body


  /*if (!body.name) {
        //return res.status(400).json({
        //    error: 'name missing'
        //})
        next(error)
    } else if (!body.number) {
        return res.status(400).json({
            error: 'number missing'
        })
    }*/

  const contact = new Contact({
    name: body.name,
    number: body.number,
  })

  contact.save().then(savedContact => {
    console.log(savedContact)
    res.json(savedContact)
  })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req,res,next) => {
  const body = req.body
  const contact = {
    name: body.name,
    number: body.number,
  }

  Contact.findByIdAndUpdate(req.params.id, contact, { new: true })
    .then(updatedContact => {
      res.json(updatedContact)
    })
    .catch(error => next(error))
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
