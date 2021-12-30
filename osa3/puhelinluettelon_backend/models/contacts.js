/*
Muuta backendin kaikkien puhelintietojen näyttämistä siten, että backend hakee näytettävät puhelintiedot tietokannasta.

Varmista, että frontend toimii muutosten jälkeen.

Tee tässä ja seuraavissa tehtävissä Mongoose-spesifinen koodi omaan moduuliinsa samaan tapaan kuin kohdassa Tietokantamäärittelyjen eriyttäminen moduuliksi.
*/
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

console.log('connecting to ', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB: ', result)
  })
  .catch(error => {
    console.log('error connecting to MongoDB', error.message)
  })

const contactSchema = new mongoose.Schema({
  name: {
    unique: true,
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    required: true,
    minlength: 8
  },
})

contactSchema.plugin(uniqueValidator)

contactSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString(),
    delete returnObject._id
    delete returnObject.__v
  }
})

module.exports = mongoose.model('Contact', contactSchema)