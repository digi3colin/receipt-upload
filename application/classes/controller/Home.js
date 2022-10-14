const { Controller } = require('@kohanajs/core-mvc');
const { ControllerMixinView } = require('kohanajs');

class ControllerHome extends Controller {
  static mixins = [ControllerMixinView];

  async action_index() {
    this.setTemplate('templates/home', { ipcountry: this.request.headers['cf-ipcountry'] || 'HK' });
  }

  async action_page() {
    const { slug } = this.request.params;
    // guard error pages
    if (/^[0-9]/.test(slug)) {
      this.setTemplate('templates/error', { status: slug });
      return;
    }

    this.body = slug;
  }
}

module.exports = ControllerHome;
