'use strict'
// create an API server - Restify is basically a stripped down version of Express with only API functionality - can use Express instead if desired.
// in development use ngrok.io utility to provide a secure url eg http or https for the app to receive messages. eg https://something.ngrok.io
// serve with command ./ngrok http 3000

const Restify = require("restify");
const server = Restify.createServer({
  name: "VanillaMessenger"
});
const PORT = process.env.PORT || 3000;

// Tokens
const config = require("./config");

// FBeamer
const FBeamer = require("./fbeamer");
const f = new FBeamer(config);

// Vanilla
const matcher = require("./matcher");
const weather = require("./weather");
const { currentWeather, forecastWeather } = require("./parser");

// server.use(Restify.plugins.acceptParser(server.acceptable));
server.use(Restify.plugins.jsonp());
server.use(Restify.plugins.bodyParser());

// Register the webhooks
server.get("/", (req, res, next) => {
  f.registerHook(req, res);
  return next();
});

// Receive all incoming messages
server.post("/", (req, res, next) => {
  f.incoming(req, res, msg => {
    // Process messages
    // f.txt(msg.sender, `Hey, you just said ${msg.message.text}`);
    // f.img(msg.sender, "http://www.stickees.com/files/food/sweet/3543-icecream-cone-sticker.png");
    if (msg.message.text) {
      // If a text message is received... at the moment the bot only understands text.
      matcher(msg.message.text, data => {
        switch (data.intent) {
          case "Hello":
            f.txt(msg.sender, `${data.entities.greeting} to you too!`);
            break;
          case "CurrentWeather":
            weather(data.entities.city, "current")
              .then(response => {
                let parseResult = currentWeather(response);
                f.txt(msg.sender, parseResult);
              })
              .catch(error => {
                console.log(
                  "There seems to be a problem connecting to the weather service"
                );
                f.txt(
                  msg.sender,
                  "Hmm, something's not right with my servers! Do check back in a while...Sorry :("
                );
              });
            break;
          case "WeatherForecast":
            weather(data.entities.city)
              .then(response => {
                let parseResult = forecastWeather(response, data.entities);
                f.txt(msg.sender, parseResult);
              })
              .catch(error => {
                console.log(
                  "There seems to be a problem connecting to the weather service"
                );
                f.txt(
                  msg.sender,
                  "Hmm, something's not right with my servers! Do check back in a while...Sorry :("
                );
              });
            break;
          default: {
            f.txt(msg.sender, "Gosh! I don't know what you mean :(");
          }
        }
      });
    }
  });
  return next();
});

// Subscribe
f.subscribe();

server.listen(PORT, () => console.log(`Vanilla running on port ${PORT}`));