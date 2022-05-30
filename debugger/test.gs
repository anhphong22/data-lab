function test(){
  // test create a sheet

  // var simp = new si;
  // simp.createSheet();
  // fetchNlgTemplate()
  // let question = utils.prototype.getSheetbyName('chemistry').getRange('G2').getValue();
  // let response = utils.prototype.getSheetbyName('chemistry').getRange('I2').getValue();
  // console.log(acon.prototype.answerSchemas(question, response))

  // console.log(agen.prototype.generateAIML())

  // console.log(utils.prototype.getCellRange())

  // var api = 'http://google.com/complete/search?q=so+khoi&output=toolbar'
  var result = UrlFetchApp.fetch(api);
  console.log(result.toString())
  
}
