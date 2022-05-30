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

  generateAIML(){
    // process multiple lines in cell and return a 1D array.
    var dataset = agen.prototype.dataset();

    // generate AIML file
    let root = XmlService.createElement('aiml');
        root.setAttribute('version', '2.0');
      
      for (let i = 0; i < dataset.length; i++){
        var patterns = dataset[i]['aiml'];
        patterns.forEach(_pattern =>{
          var _template = dataset[i]['intent'];
          var item = schemas.prototype.questionSchemas(_template,_pattern);

          root.addContent(item)
        }
      
        )
        // create answer correspondingly
        var nlg = dataset[i]['response'];
        var _pattern = dataset[i]['intent'];
        let answer = schemas.prototype.answerSchemas(nlg, _pattern);

        root.addContent(answer)
      }

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
      item.aiml = utils.prototype.flattenArray(sheet.getRange(i+2, colaiml).getValues())
                  .toString().split('\n').slice(0,-1);

      dataset.push(item)
    }

    return dataset;

  }

}

function main1(){
  var dataset = agen.prototype.dataset();
  console.log(agen.prototype.generateAIML())
}


