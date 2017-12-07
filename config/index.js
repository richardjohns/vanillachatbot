"use strict";

if (process.env.NODE_ENV === "production") {
  module.exports = {
    PAGE_ACCESS_TOKEN: process.env.PAGE_ACCESS_TOKEN,
    VERIFY_TOKEN: process.env.VERIFY_TOKEN
  };
} else {
  module.exports = require("./development.json");
}


// "VERIFY_TOKEN": "c87b9d1ccf9ffc934a14cf627d2dee16469ba173334339fc"
