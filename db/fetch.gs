/** * @OnlyCurrentDoc */
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


function onEdit(e){
  var activateSheet = utils.prototype.getSheetbyName('prediction'),
      header = utils.prototype.getData('prediction', 1, 1, 1, activateSheet.getLastColumn() , 'header');
  var row = e.range.getRow()
  var column_message = utils.prototype.getColumnIndexbyName(header,'message')
  if (e.range.getColumn()===column_message){
    if (activateSheet.getRange(row, column_message) != ''){
      var target = e.range.getValue()
      var style = SpreadsheetApp
                      .newRichTextValue()
                      .setText(target)
                      .setTextStyle(0,target.length,SpreadsheetApp.newTextStyle().setForegroundColor("#000000").build())
                      .build()
      activateSheet.getRange(row,2).setRichTextValues([
                        [style],
                    ]);
      var column_predict = utils.prototype.getColumnIndexbyName(header,'respones_api')
      var cell = activateSheet.getRange(row, column_predict)
      cell.setFormula(`=predict(B${row})`);
      var column_intent = utils.prototype.getColumnIndexbyName(header,'intent_predicted')
      var cell = activateSheet.getRange(row, column_intent)
      cell.setFormula(`=get_intent(D${row})`);
      var column_entity = utils.prototype.getColumnIndexbyName(header,'entity_predicted')
      var cell = activateSheet.getRange(row, column_entity)
      cell.setFormula(`=get_entity(D${row})`);
      var column_value = utils.prototype.getColumnIndexbyName(header,'value')
      var cell = activateSheet.getRange(row, column_value)
      cell.setFormula(`=get_text(D${row})`);

      var column_value = utils.prototype.getColumnIndexbyName(header,'validated');
      var cell = activateSheet.getRange(row, column_value)
      cell.insertCheckboxes();
      var column_value = utils.prototype.getColumnIndexbyName(header,'no');
      var cell = activateSheet.getRange(row, column_value)
      cell.setValue(row-1);
    }

    if (activateSheet.getRange(row, utils.prototype.getColumnIndexbyName(header,'value')) != ''){
      highlight(row=row)
    }
  }
  var column_true_value = utils.prototype.getColumnIndexbyName(header,'true_value')
  if (e.range.getColumn()===column_true_value){
    if (activateSheet.getRange(row, utils.prototype.getColumnIndexbyName(header,'true_value')) != ''){
      highlight(row=row)
    }
  }
  var column_true_intent = utils.prototype.getColumnIndexbyName(header,'true_intent')
  var column_true_entity = utils.prototype.getColumnIndexbyName(header,'true_entity')
  var column_true_value = utils.prototype.getColumnIndexbyName(header,'true_value')
  if ([column_true_intent,column_true_entity,column_true_value].indexOf(e.range.getColumn()!==-1)){
    var column_value = utils.prototype.getColumnIndexbyName(header,'validated');
    if (activateSheet.getRange(row, column_true_intent).getValue() === '' 
        && activateSheet.getRange(row, column_true_entity).getValue() === ''
        &&  activateSheet.getRange(row, column_true_value).getValue() === '')
    {
        activateSheet.getRange(row, 1,1,column_value).setBackground('white')
    }
    else{
        activateSheet.getRange(row, 1,1,column_value).setBackground('yellow')
    }
  }
}

function get_intent(text){
  if (text!=''){
    text = JSON.parse(text)
    return text[1].intent
  }
  else return ''
}

function get_entity(text){
  if (text!=''){
    text = JSON.parse(text)
    entities = text[1].entities

    console.log(text)
    return entities[0].type
  }
  else return ''
}

function get_text(text){
  if (text!=''){
    text = JSON.parse(text)
    entities = text[1].entities

    console.log(text)
    return entities[0].text
  }
  else return ''
}

function predict(text){
  if (text!==''){
    var payload = {
          "sender_id": "default",
          "text": text.toLowerCase(),
          "context": {}
        }

    var options = {
      'method' : 'post',
      'contentType': 'application/json',
      // Convert the JavaScript object to a JSON string.
      'payload' : JSON.stringify(payload)
    };

    var response = UrlFetchApp.fetch('https://dry-plants-begin-118-69-70-245.loca.lt/api/parse', options)
    var data = JSON.parse(response)
  
    return JSON.stringify(data)
  }
  else return ''
}

function get_matched_index(source,target){
  var regex = new RegExp(`${source}`,'gm')
  var current;
  var matchIndexes = [];
  while ((current = regex.exec(target)) != null)
  {
    matchIndexes.push(current.index);
  }
  console.log(matchIndexes)
  return matchIndexes
}

function highlight(row=2){

  var activesheet = utils.prototype.getSheetbyName('prediction')
  var green = SpreadsheetApp.newTextStyle().setForegroundColor("#0000ff").build();
  var red = SpreadsheetApp.newTextStyle().setForegroundColor("#ff0000").build();
  var target = activesheet.getRange(row,2).getValue();
  if (activesheet.getRange(row,9).getValue()!==''){
    var source = activesheet.getRange(row,9).getValue()
    var lst_index = get_matched_index(source = source,target=target)
    var style = SpreadsheetApp
                  .newRichTextValue()
                  .setText(target)
                  .setTextStyle(lst_index[0], lst_index[0]+ source.length,green)
                  .build()
  activesheet.getRange(row,2).setRichTextValues([
                    [style],
                ]);
  }
  if (activesheet.getRange(row,10).getValue()!=='')
  {
    var source = activesheet.getRange(row,10).getValue()
    var lst_index = get_matched_index(source = source,target=target)
    var style = SpreadsheetApp
                  .newRichTextValue()
                  .setText(target)
                  .setTextStyle(lst_index[0], lst_index[0]+ source.length,red)
                  .build()
  activesheet.getRange(row,2).setRichTextValues([
                    [style],
                ]);
  }
  
}