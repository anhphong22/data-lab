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

const aufi = class AutoFill{

  // init 
  constructor(){
    
  }

  fillUserIntent(range, pair_mapping){
    let sheet = utils.prototype.getSheetbyName;
    let cIndex = utils.prototype.getColumnIndexbyName;
    let current_col = SHEET.getRange(range).getColumn();
    let header = headerProperties.data;

    let start = parseInt(SHEET.getRange(range).getRowIndex());
    let end = SHEET.getRange(range).getNumRows();
    
    let adj = SHEET.getRange(range).getValues();
        adj = utils.prototype.flattenArray(adj);
    
    
    if (sheet('chemistry').getRange(1, current_col).getValue().toString().toLowerCase().trim('') == 'adj'){
      for (let i=0; i < adj.length; i++){
        let m = i + start;
        let user_intent = adj[i].toString().slice(adj[i].indexOf('.') + 1);
        let quesword = user_intent.substring(0, user_intent.indexOf('_'));
        let response = `/utter_res_${user_intent}`;
        sheet('chemistry').getRange(m, cIndex(header, 'user intent')).setValue(user_intent)
        sheet('chemistry').getRange(m, cIndex(header, 'response')).setValue(response);
      }
  
    }else{
      Logger.log('You should select cell ranges in adj')
    }
  }

  fillAIML(range, intent){
    let sheet = utils.prototype.getSheetbyName;
    let cIndex = utils.prototype.getColumnIndexbyName;
    let header = headerProperties.data;

    let start = parseInt(SHEET.getRange(range).getRowIndex());
    let end = SHEET.getRange(range).getNumRows();

    let user_intent = sheet('chemistry').getRange(start, cIndex(header, 'user intent'), end, 1).getValues();
        user_intent = utils.prototype.flattenArray(user_intent);
    
    let intent_db = sheet('AIML_chemistry').getRange(2, 2, sheet('AIML_chemistry').getLastRow(),1).getValues();
        intent_db = utils.prototype.flattenArray(intent_db);
    

    for (let i=0; i < user_intent.length; i++){
      let m = i + start;
      let intent = user_intent[i].split('.')[0].toString();
    
      // query intent in AIML database to retrieve template correspondingly
      if (intent_db.indexOf(intent) != -1){
        let template = sheet('AIML_chemistry').getRange(intent_db.indexOf(intent)+2, 3).getValues();
        let templates = process.prototype.processMultiplelines(template);

        let object = sheet('chemistry').getRange(m, cIndex(header, 'object')).getValue();
        let result = '';

        for (let t in templates){
          // result += templates[t][0].split('~[default_obj_full]').join(`@[${object}]`)+ '\n'
          // console.log(result)
          result += templates[t][0].replace(`%[${intent}]`,`%[${intent}.${object}]` ).replace('~[default_obj_full]', `@[${object}]`) + '\n'
          // console.log(result)
        }

        sheet('chemistry').getRange(m, cIndex(header, 'aiml')).setValue(result)
       
      }

    }
      
  }

}
    
  
function main(){
  var pair_mapping = {
    ask: "ans"
  }
  var range = utils.prototype.getCellRange();
  aufi.prototype.fillUserIntent(range, pair_mapping)
  // console.log(SHEET.getRange(range).getColumn())
  aufi.prototype.fillAIML(range)
  
  
}