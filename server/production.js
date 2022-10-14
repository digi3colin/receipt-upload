require('dotenv').config()
const { KohanaJS } = require('kohanajs');

KohanaJS.ENV = 'prd';
const Server = require('./Server');

(async () => {
  const s = new Server(parseInt(process.env.PORT ?? 8000) + 3);
  await s.setup();
  KohanaJS.configForceUpdate = false;
  KohanaJS.config.classes.cache = true;
  //  require("@kohanajs/mod-route-debug");
  await s.listen();
})();
