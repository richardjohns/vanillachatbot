'use strict'

const Readline = require('readline')

const rl = Readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
})

const matcher = require('./matcher')

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