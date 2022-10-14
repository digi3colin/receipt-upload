const { View } = require('@kohanajs/core-mvc');
const { KohanaJS } = require('kohanajs');
const { LiquidView } = require('@kohanajs/mod-view-adapter-liquidjs');
require('./requires');
View.DefaultViewClass = LiquidView;

module.exports = {
  modules: [],
};

KohanaJS.initConfig(new Map([
  ['setup', ''],
]));
