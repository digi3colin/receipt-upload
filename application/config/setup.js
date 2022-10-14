const {KohanaJS} = require('kohanajs');
const {ServerAdapterFastify: ServerAdapter} = require("@kohanajs/platform-web-fastify");
//const {ServerAdapterExpress: ServerAdapter} = require("@kohanajs/platform-web-express");

module.exports = {
  notFound: '/pages/404',
  databaseFolder: `${KohanaJS.EXE_PATH}/../database`,
  platform:{
    adapter: ServerAdapter
  }
};
