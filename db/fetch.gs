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

function fetchNlgTemplate(){
  // fectch data from CDMS via public API
  var response = UrlFetchApp.fetch(NLG_API);
  var data = JSON.stringify(JSON.parse(response), null, 4);

  Logger.log('Fetched successfully!')

  var system_intents = Object.keys(JSON.parse(response).templates);

  // create a list of single system intent
  for (var i = 0; i < system_intents.length; i++){
    var temp = {}
    temp[`${system_intents[i]}`] = JSON.parse(response).templates[`${system_intents[i]}`];

    // fill in data to dummy database
    var dbSheet = utils.prototype.getSheetbyName('NLG_chemistry'),
        header = utils.prototype.getData('NLG_chemistry', 1, 1, 1, 3, 'header');
    
    dbSheet.getRange(i+2, utils.prototype.getColumnIndexbyName(header, 'no'))
           .setValue(i+1)
           .setVerticalAlignment('top')
           .setHorizontalAlignment('left');
    
    dbSheet.getRange(i+2, utils.prototype.getColumnIndexbyName(header, 'system intent'))
           .setValue(system_intents[i])
           .setVerticalAlignment('top')
           .setHorizontalAlignment('left');

    dbSheet.getRange(i+2, utils.prototype.getColumnIndexbyName(header, 'messages'))
           .setValue(json2yaml(temp));
    SHEET.autoResizeColumn(utils.prototype.getColumnIndexbyName(header, 'messages'))

  }


}