'use strict'
// create an API server

const Restify = require('restify')
const server = Restify.createServer({
    name: 'VanillaMessenger'
})
const PORT = process.env.PORT || 3000

// when deployed, deployment platform will provide port.

// Tokens
const config = require('./config')

//FBeamer
const FBeamer = require('./fbeamer')
const f = new FBeamer(config)

// Test
server.get('/', (req, res, next) => {
    res.send("Hello")
    return next()
})

server.listen(PORT, () => console.log(`Vanilla server up!.. on port ${PORT}`))