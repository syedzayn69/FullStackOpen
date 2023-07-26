const mongoose = require('mongoose')

mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.connect(url)
    .then(res => {
        console.log('we are connected to mongo')
    })
    .catch(error => {
        console.log('connection failed due to',error.message)
    })

const personSchema = new mongoose.Schema({
    name : String,
    number : String
})
personSchema.set('toJSON',{
    transform:  (document,returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports =  mongoose.model('Person',personSchema)