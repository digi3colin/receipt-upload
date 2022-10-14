require('dotenv').config()
const { KohanaJS } = require('kohanajs');

KohanaJS.ENV = 'uat';
const Server = require('./Server');

(async () => {
  const s = new Server(parseInt(process.env.PORT ?? 8000) + 1);
  await s.setup();
  //  require("@kohanajs/mod-route-debug");
  await s.listen();
})();
