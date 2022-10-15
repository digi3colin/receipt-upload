const { Controller } = require('@kohanajs/core-mvc');
const { ControllerMixinView, KohanaJS } = require('kohanajs');
const { ControllerMixinMultipartForm, HelperForm } = require("@kohanajs/mod-form");

const path = require("path");
const fs = require('node:fs');
const { Rekognition } = require('@aws-sdk/client-rekognition');
const { fromIni } = require('@aws-sdk/credential-provider-ini');
const { Textract, AnalyzeDocumentCommand, AnalyzeExpenseCommand } = require("@aws-sdk/client-textract");

class ControllerHome extends Controller {
  static mixins = [ControllerMixinView, ControllerMixinMultipartForm];
  constructor(request) {
    super(request);
  }

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

    const bytes = await fs.promises.readFile(path.normalize(KohanaJS.APP_PATH + '/../public/' + uploaded));

    ControllerHome.credentials = ControllerHome.credentials || fromIni({
      profile: "default",
      filepath: path.normalize(KohanaJS.APP_PATH + '/config/credentials'),
    });

    ControllerHome.client = ControllerHome.client || new Rekognition({
      region: "ap-southeast-1",
      credentials: ControllerHome.credentials,
    });

    const params = {
      Image: {
        Bytes: bytes,
      },
    }

    const result = await this.detect(ControllerHome.client, params);
    const htmls = [
      `Detected Text for: ${uploaded}`,
    ];

    result.TextDetections.forEach(label => {
      htmls.push(`Detected Text: ${label.DetectedText}`);
      htmls.push(`Type: ${label.Type}`);
      htmls.push(`ID: ${label.Id}`);
      htmls.push(`Parent ID: ${label.ParentId}`);
      htmls.push(`Confidence: ${label.Confidence}`);
      htmls.push(`Polygon: `);
      htmls.push(JSON.stringify(label.Geometry.Polygon));
      }
    )

    this.body = htmls.join('<br>');
  }

  detect(client, params){
    return new Promise((resolve, reject)=>{
      client.detectText(params, (err, response) => {
        if (err) return reject(err);
        resolve(response);
      });
    })
  }

  async action_submit2(){
    ControllerHome.credentials = ControllerHome.credentials || fromIni({
      profile: "default",
      filepath: path.normalize(KohanaJS.APP_PATH + '/config/credentials'),
    });

    ControllerHome.client2 = ControllerHome.client2 || new Textract({
      region: "ap-southeast-1",
      credentials: ControllerHome.credentials,
    });

    const $_POST = this.state.get(ControllerMixinMultipartForm.POST_DATA);
    const uploaded = await HelperForm.moveToUpload($_POST['photo'], '/media/upload');

    const bytes = await fs.promises.readFile(path.normalize(KohanaJS.APP_PATH + '/../public/' + uploaded));
    const params = {
      Document: {
        Bytes: bytes
      }
    }

    const cmd = new AnalyzeExpenseCommand(params);
    const result = await ControllerHome.client2.send(cmd);

    const htmls = ['<img src="'+uploaded+'" width="600" alt=""/>'];
    result.ExpenseDocuments[0].SummaryFields.forEach(it => {
      if(it.ValueDetection.Text === "")return;
      htmls.push(it.Type.Text + " : "+ it.ValueDetection.Text + " ("+it.Type.Confidence+"%)");
    })

    htmls.push("<hr>");
    result.ExpenseDocuments[0].LineItemGroups.forEach(it => {
      it.LineItems.forEach(x => {
        x.LineItemExpenseFields.forEach(y => {
          let line = y.Type.Text + " : "+ y.ValueDetection.Text + " ("+y.Type.Confidence+"%)";

          if(y.Type.Text === "PRICE"){
            line = "<b>"+ line + "</b>";
          }
          htmls.push(line);
        })
      })
    })

    this.body = htmls.join('<br>');
  }
}

module.exports = ControllerHome;
