require('dotenv').config()
const { KohanaJS } = require('kohanajs');

KohanaJS.ENV = 'dev';
const Server = require('./Server');

(async () => {
  const s = new Server(process.env.PORT ?? 8000);
  await s.setup();
  require('@kohanajs/mod-route-debug');
  await s.listen();
})();
