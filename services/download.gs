function download() {
  const ui = SpreadsheetApp.getUi();
  const width = 300;
  const height = 10;
  const html = HtmlService.createHtmlOutputFromFile("services/indexDownload.html");
  html.setWidth(width).setHeight(height)
  ui.showModalDialog(html, "downloaded successfully!");
}

function downloadFile() {
  let sheet = utils.prototype.getSheetbyName('chemistry');
  var obj = agen.prototype.generateAIML();
  const filename = `${sheet.getName()}.aiml`;
  const blob = Utilities.newBlob(obj, MimeType.XML , filename);
  return {data: `data:${MimeType.XML};base64,${Utilities.base64Encode(blob.getBytes())}`, filename: filename};
}