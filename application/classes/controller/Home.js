const { Controller } = require('@kohanajs/core-mvc');
const { ControllerMixinView } = require('kohanajs');
const { ControllerMixinMultipartForm, HelperForm } = require("@kohanajs/mod-form");

class ControllerHome extends Controller {
  static mixins = [ControllerMixinView, ControllerMixinMultipartForm];

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

  async action_submit(){
    const $_POST = this.state.get(ControllerMixinMultipartForm.POST_DATA);
    const uploaded = await HelperForm.moveToUpload($_POST['photo'], '/media/upload');
    console.log(uploaded);
  }
}

module.exports = ControllerHome;
