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
    // var range = utils.prototype.getCellRange();
    let adj = SHEET.getRange(range).getValues();
        adj = utils.prototype.flattenArray(adj);
    
    let cIndex = utils.prototype.getColumnIndexbyName(headerProperties.data, 'user intent');
    
    for (let i=0; i < adj.length; i++){
      let user_intent = adj[i].toString().slice(adj[i].indexOf('.') + 1);
      let quesword = user_intent.substring(0, user_intent.indexOf('_'));
      user_intent = `/utter_${user_intent.replace(quesword,pair_mapping[`${quesword}`])}`;
      utils.prototype.getSheetbyName('chemistry').getRange(i+2, cIndex).setValue(user_intent);
    }
  
  }
  
}

function main(){
  var pair_mapping = {
    ask: "ans"
  }
  var range = utils.prototype.getCellRange();
  aufi.prototype.fillUserIntent(range, pair_mapping)
}