'use strict'

const Readline = require('readline')

const rl = Readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
})

const matcher = require('./matcher')
const weather = require('./weather')
const {currentWeather} = require('./parser')

rl.setPrompt('> ')
rl.prompt()
rl.on('line', reply => {
    matcher(reply, data => {
        switch (data.intent) {
          case "Hello":
            console.log(`${data.entities.greeting} to you too`);
            rl.prompt();
            break;
          case "CurrentWeather":
            console.log(`Checking weather for ${data.entities.city}`);
            weather(data.entities.city, 'current')
                .then(response => {
                    let parseResult = currentWeather(response)
                    console.log(parseResult)
                    rl.prompt();
                })
                .catch(error => {
                    console.log("We have a problem Houston: ", error)
                    rl.prompt();
                })
            rl.prompt();
            break;
          case "Exit":
            console.log("Bye and have a great day!");
            process.exit(0);
          default: {
            console.log("I don't understand");
            rl.prompt();
          }
        }
    })
})