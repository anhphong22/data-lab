// Copyright 2022 NLP VA-Team
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      https://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


const agen = class AIMLGenerator{

  // TODO generate an AIML file that adapts a rule-based XML
  constructor(){
    

  }

  generateAIML(range){
    // process multiple lines in cell and return a 1D array.
    var patterns = utils.prototype.getSheetbyName('chemistry').getRange(range).getValues();
    var patterns = process.prototype.processMultiplelines(patterns);
    var patterns = utils.prototype.flattenArray(patterns);

    // generate AIML file
    let root = XmlService.createElement('aiml');
        root.setAttribute('version', '2.0');
      
      patterns.forEach(_pattern =>{
        var _template = [];
        var item = acon.prototype.questionSchemas(_template,_pattern);

        root.addContent(item)
      }
      
      )

      // create answer respectively
      var nlg = utils.prototype.getSheetbyName('chemistry').getRange('I2').getValue();
      var _pattern = utils.prototype.getSheetbyName('chemistry').getRange('G2').getValue();
      let answer = acon.prototype.answerSchemas(nlg, _pattern);

      root.addContent(answer)

    var dataset = this.generateAIML();
    var patterns = utils.prototype.flattenArray(dataset.aiml);

    // generate AIML file
    // let root = XmlService.createElement('aiml');
    //     root.setAttribute('version', '2.0');

    
    let document = XmlService.createDocument(root);
    let aiml = XmlService.getPrettyFormat()
                         .setLineSeparator('\n')
                         .setEncoding('UTF-8')
                         .format(document);

    // process escape characters in XML format
    return decodeXml(aiml);

  }

  // get dataset to generate aiml file
  dataset(domain_name, skill_name){
    let sheet = utils.prototype.getSheetbyName('chemistry');
    let header = headerProperties.data;
    let lastRow = sheet.getLastRow();
    let colIndex = utils.prototype.getColumnIndexbyName(header,'user intent');
    let colres = utils.prototype.getColumnIndexbyName(header,'response');
    let colaiml = utils.prototype.getColumnIndexbyName(header,'aiml');


    let data = sheet.getRange(2,colIndex, lastRow, 1).getValues();
        data = utils.prototype.flattenArray(data).slice(0, -1);

    let dataset = [];

    for (let i = 0; i < data.length; i++){
      let item = {}
      item.intent = data[i];
      item.response = sheet.getRange(i+2,colres).getValue();
      item.aiml = sheet.getRange(i+2, colaiml).getValues();

      dataset.push(item)
    }

    return dataset;

  }

}

function main1(){
  var t = agen.prototype.dataset();
  for (let i = 0; i < t.length; i++){
    console.log(t[i]['intent'])
  }
}
