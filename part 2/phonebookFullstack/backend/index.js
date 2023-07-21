const { error } = require('console')
const express = require('express')
const morgan  = require('morgan')
const { request } = require('http')
const cors = require('cors')
const app = express()
app.use(cors)

let contacts = [
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
      "name": "Mary Mario Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons/:id',(request,response)=> {
    const id = Number(request.params.id)
    const contact = contacts.find(elem => elem.id === id)
    if(contact){
        response.json(contact)
    }else{
        response.status(404).end()
    }
})

app.get('/info',(request,response)=> {
    response.send(`Phonebook has onfo for ${contacts.length} people </br> ${Date()}`)
})

app.get('/api/persons',(request,response)=> {
    response.json(contacts)
})

app.delete('/api/persons/:id',(request,response) => {
    const id = Number(request.params.id)
    contacts = contacts.filter(elem => elem.id !== id)
    response.status(204).end()
})

// DEFINING CUSTOM TOKENS IN MORGAN
morgan.token('content',function(req,res) {
    return JSON.stringify(req.body)
})
////

app.use(express.json())
app.post('/api/persons',morgan(`:method :url :status :res[content-length] - :response-time ms :content`),(request,response) => {
    // console.log(request.headers)  // TO CHECK HEADER TYPE
    const body = request.body
    const id = Math.round(Math.random() * 10000)
    const newContact = {
        name : body.name,
        number : body.number,
        id : id
    }
    // CHECK CONDITIONS 
    {
        if(contacts.find(elem => body.name === elem.name)){
            return response.status(400).json({
                error: "Contact Already Exists!"
            })}
            else if (body.name === ""){
                return response.status(400).json({
                    error : "Empty field not acceptable as Name"
                })}
                else if (body.number === ""){
                    return response.status(400).json({
                        error : "Empty field not acceptable as Number"
                    })}    
    }
    contacts = contacts.concat(newContact)
    response.json(newContact)
})

const unknownEndPoint = (request,response) => {
    response.status(404).send({error: 'unknown endpoint'})
}
app.use(unknownEndPoint)

const PORT = process.env.PORT || 3001
app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`)
})