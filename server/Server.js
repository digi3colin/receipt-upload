const path = require('path');
const { init, KohanaJS} = require('kohanajs');
// setup KohanaJS path constants
init({
  EXE_PATH:  path.normalize(__dirname),
  APP_PATH:  path.normalize(`${__dirname}/../application`),
  VIEW_PATH: path.normalize(`${__dirname}/../views`),
  MOD_PATH:  path.normalize(`${__dirname}/../application/modules`)
});
// run application/routes.js to create routes
const { RouteList } = require('@kohanajs/mod-route');
require('../application/routes');

class Server {
  constructor(port = 8001) {
    this.port = port;
    this.adapter = KohanaJS.config.setup.platform.adapter;
  }

  async setup() {
    this.app = await this.adapter.setup();
  }

  async listen() {
    console.log(KohanaJS.ENV, KohanaJS.config);
    console.log(Array.from(RouteList.routeMap.values()).map(route => route.path + " " + route.method + ' => '+ route.controller + '::action_' + route.action).sort());
    await this.app.listen(this.port);
    console.log(`app listening at ${this.port}`);
  }
}

module.exports = Server;
