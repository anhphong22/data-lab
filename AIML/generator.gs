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
    var questions = utils.prototype.getSheetbyName('chemistry').getRange(2,12, 1, 1).getValues();
    var questions = process.prototype.processMultiplelines(questions);
    var questions = utils.prototype.flattenArray(questions);

    // generate AIML file
    let root = XmlService.createElement('aiml');
        root.setAttribute('version', '2.0');
      
      questions.forEach(question =>{
        var _pattern = utils.prototype.getSheetbyName('chemistry').getRange('G2').getValue();
        var item = acon.prototype.questionSchemas(question,_pattern);

        root.addContent(item)
      }
      )
    
    let document = XmlService.createDocument(root);
    let aiml = XmlService.getPrettyFormat().format(document);

    // process escape characters in XML format
    return decodeXml(aiml);

  }
  

}
