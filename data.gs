// Use a onOpen() simple trigger to create
// a custom menu.
function onOpen(e) {
  const ui = SpreadsheetApp.getUi();
  var exportData = ui.createMenu("Export")
    .addItem('JSON', 'download')
    .addSeparator()
    .addItem("AIML", "aiml")
    .addItem("FAQ", "faq")
    .addItem("NLG", "nlg")
  ui.createMenu("Utilities")
   .addItem("Add Pattern", "loadForm")
   .addItem("Review", "review")
   .addSeparator()
   .addSubMenu(exportData)
   .addToUi();
}

function  aiml(){
  alertMessageTitle('AIML', 'Under construction')
}

function  faq(){
  alertMessageTitle('FAQ', 'Under construction')
}

function  nlg(){
  alertMessageTitle('NLG', 'Under construction')
}


function download() {
  const width = 300;
  const height = 10;
  const html = HtmlService.createHtmlOutputFromFile("index");
  html.setWidth(width).setHeight(height)
  ui.showModalDialog(html, "downloaded successfully!");
}

function downloadFile() {
  const obj = getSkills();
  const filename = `${sheet.getName()}.json`;
  const blob = Utilities.newBlob(obj, MimeType.JSON, filename);
  return {data: `data:${MimeType.JSON};base64,${Utilities.base64Encode(blob.getBytes())}`, filename: filename};
}


const sheet = SpreadsheetApp.getActive().getActiveSheet();
// const header = sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0];
const ui = SpreadsheetApp.getUi();

// get user email
function userEmail(){
  let user = Session.getActiveUser().getEmail();
  return user;
}


function onEdit(e){
  
  let user = userEmail();
  let cellRange = sheet.getActiveCell();
  let rowIndex = cellRange.getRow();
  let columnIndex = cellRange.getColumn();
  let adj = cellRange.getValue();

  if (['AIML', 'NLG'].indexOf(sheet.getName().split('_')[0]) == -1){
    // check protection
    if (header[columnIndex-1].toString().toLowerCase().trim(' ') == 'adj'){
      let adj = cellRange.getValue();
      let intent = adj.toString().split('.')[1]
      let nlu = adj.toString().slice(adj.toString().indexOf('.') + 1);
      let utter = '/utter_' + nlu.replace('.', '_');
    
      sheet.getRange(rowIndex,getColumnIndexbyName('intent')).setValue('Intent: ' + nlu);
      bold(sheet.getRange(rowIndex,getColumnIndexbyName('intent')), 'Intent')
      sheet.getRange(rowIndex, getColumnIndexbyName('response')).setValue(utter)
      registerNLG(utter)

      // check naming convention
      if (sheet.getRange(rowIndex, getColumnIndexbyName('adj')).getValue() !='' 
          && sheet.getRange(1, columnIndex).getValue().toLocaleString().toLowerCase() == 'adj'){
        let adj_prefix = adj.toString().split('.')[0];
        let example_error = '<chemistry>.<ask_define>.<other>';
        namingConvention(adj_prefix, example_error);
      }

      // insert checkbox
      let reviewcolIndex = getColumnIndexbyName('confirmed');
      if (sheet.getRange(rowIndex, reviewcolIndex).isChecked() == null){
        // let range = sheet.getRange(rowIndex, reviewcolIndex);
        insertCheckboxes(rowIndex, reviewcolIndex);
        let range = sheet.getRange(rowIndex, reviewcolIndex, 1, 2);
        let protection = range.protect().setDescription('This range is protected and you do not have permission to edit it');
        protection.removeEditors(protection.getEditors());
        if (protection.canDomainEdit()) {
          protection.setDomainEdit(false);
        }
        protection.addEditors(['phongnt@ftech.ai', 'nguyenkytungcntt04@gmail.com', 'haonv@ftech.ai'])
      }

      // redefine AIML
      let aiml_constructor = AIML(cellRange,intent);
      let current_aiml = sheet.getRange(rowIndex, getColumnIndexbyName('aiml')).getValue();

      // check if adj and object are not null
      if (sheet.getRange(rowIndex, getColumnIndexbyName('adj')).getValue() !='' 
          && sheet.getRange(rowIndex, getColumnIndexbyName('object')).getValue() !='' ){
        if (aiml_constructor === ''){
          let aiml_constructor = "This intent is unavailable, please add it into aiml template"
          sheet.getRange(rowIndex, getColumnIndexbyName('aiml')).setValue(aiml_constructor.trim('\n')).setFontColor('red');
          let title = 'Pattern not found';
          let message = 'This intent is unavailable, do you want add it to template?';
          let response_error = response(title, message);
          Logger.log(response_error);
          if (response_error == ui.Button.YES){
            // var width = 560;
            // var height = 420;
            // var html = HtmlService.createHtmlOutputFromFile('pattern');
            // html.setWidth(width).setHeight(height);
            // var ui = SpreadsheetApp.getUi();
            // ui.showModalDialog(html,"AIML Pattern Add-in")
            loadForm()
          }
          }
        else{
          sheet.getRange(rowIndex, getColumnIndexbyName('aiml')).setValue(aiml_constructor.trim('\n')).setFontColor('black');;
        }
          sheet.getRange(rowIndex, getColumnIndexbyName('aiml')).setNote(current_aiml);

        if (sheet.getRange(rowIndex, getColumnIndexbyName('annotator')).getValue() == ''){
        let annotator_info = 'Annotated by: ' + user + '\n' + 'Created at: ' + timenow();
        sheet.getRange(rowIndex, getColumnIndexbyName('annotator')).setValue(annotator_info).setVerticalAlignment('middle');
        bold(sheet.getRange(rowIndex, getColumnIndexbyName('annotator')), 'Annotated by:');
        bold(sheet.getRange(rowIndex, getColumnIndexbyName('annotator')), 'Created at:');
      }
      else{
        let update_info = 'Updated by: ' + user + '\n' + 'Updated at: ' + timenow();
        sheet.getRange(rowIndex, getColumnIndexbyName('annotator')).setNote(update_info);
      }
    }
  }
      

    else if (header[columnIndex-1].toString().toLowerCase().trim(' ') == 'object'){
      // construct AIML 
      let adj = sheet.getRange(rowIndex, getColumnIndexbyName('adj')).getValue();
      let intent = adj.toString().split('.')[1];
      let aiml_constructor = AIML(cellRange,intent);
      let current_aiml = sheet.getRange(rowIndex, getColumnIndexbyName('aiml')).getValue();

      // check if adj and object are not null
      if (sheet.getRange(rowIndex, getColumnIndexbyName('adj')).getValue() !='' 
          && sheet.getRange(rowIndex, getColumnIndexbyName('object')).getValue() !='' ){
        if (aiml_constructor === ''){
          let aiml_constructor = "This intent is unavailable, please add it into aiml template"
          sheet.getRange(rowIndex, getColumnIndexbyName('aiml')).setValue(aiml_constructor.trim('\n')).setFontColor('red');
        }
        else{
          sheet.getRange(rowIndex, getColumnIndexbyName('aiml')).setValue(aiml_constructor.trim('\n')).setFontColor('black');;
        }
          sheet.getRange(rowIndex, getColumnIndexbyName('aiml')).setNote(current_aiml);
        
        if (sheet.getRange(rowIndex, getColumnIndexbyName('annotator')).getValue() == ''){
        let annotator_info = 'Annotated by: ' + user + '\n' + 'Created at: ' + timenow();
        sheet.getRange(rowIndex, getColumnIndexbyName('annotator')).setValue(annotator_info).setVerticalAlignment('middle');
        bold(sheet.getRange(rowIndex, getColumnIndexbyName('annotator')), 'Annotated by:');
        bold(sheet.getRange(rowIndex, getColumnIndexbyName('annotator')), 'Created at:');
        }
        else{
        let update_info = 'Updated by: ' + user + '\n' + 'Updated at: ' + timenow();
        sheet.getRange(rowIndex, getColumnIndexbyName('annotator')).setNote(update_info);
        }
      }
    }

    // review info
    if (header[columnIndex-1].toString().toLowerCase().trim(' ') == 'confirmed'){
      if (sheet.getRange(rowIndex, getColumnIndexbyName('confirmed')).isChecked() === true){
        sheet.getRange(rowIndex, getColumnIndexbyName('reviewer'))
            .setValue(user)
            .setVerticalAlignment('middle')
            .setFontColor('red');
        
        }
      else{
        sheet.getRange(rowIndex, getColumnIndexbyName('reviewer'))
              .setValue('')
              .setVerticalAlignment('middle')
              .setFontColor('red');
      }
    }

    }
  else if('NLG'.indexOf(sheet.getName().split('_')[0]) == 0){
    var targetSheet = getSheetByName(sheet.getName().split('NLG_')[1]),
        responses = flattenArray(targetSheet.getRange(3, 9, targetSheet.getLastRow(), 1).getValues()); // refactor and employ getColumnIndexByName 
    var utter = sheet.getRange(rowIndex, 2).getValue(),  // refactor and employ getColumnIndexByName 
        nlg_message = sheet.getRange(rowIndex, columnIndex).getValue();
    if(responses.indexOf(utter) != -1){
      targetSheet.getRange(responses.indexOf(utter)+3, 9).setNote(nlg_message)
    }
  }   
    
}

// function to register utterance to NLG_template
function registerNLG(utter){
  function setName(){
    var targetedName = SpreadsheetApp.getActiveSheet().getName().toString();
    if (targetedName.indexOf('NLG_') > -1){
      name = targetedName;
      
    } else{
      name = 'NLG_' + targetedName;
    }
    return name;
  }
  name = setName()

  var active_sheet = getSheetByName(name),
      lastRow = active_sheet.getLastRow();

  let current_utterance = flattenArray(active_sheet.getRange(2, 2, lastRow,1).getValues()); // refactor getColumnIndexByName
  if (current_utterance.indexOf(utter) == -1){
    active_sheet.getRange(lastRow+1, 1).setValue(lastRow);
    active_sheet.getRange(lastRow+1, 2).setValue(utter);
    active_sheet.getRange(lastRow+1, 1, 1, 3).setBorder(true, true, true, true, true, true)
  }else{
    console.log('Utterance is available')
  }

  var response = UrlFetchApp.fetch("https://be-cdms.dev.ftech.ai/get_dummy_nlg");
  var data = JSON.stringify(JSON.parse(response), null, 4)
  var system_intent = active_sheet.getRange(lastRow+1, 2).getValue().replace('/','').toString();
  console.log(system_intent)
  var system_intent_template = Object.keys(JSON.parse(response).templates);
  if (system_intent_template.indexOf(system_intent) != -1){
    var message = {}
    message[`${system_intent}`] = JSON.parse(response).templates.utter_office_ask_info;
  } else{
    message = 'This message should be defined in cdms'
  }
  active_sheet.getRange(lastRow+1, 3).setValue(json2yaml(message))

}

// function to check adj-named convention
function namingConvention(adj_prefix, example_error){
  let prefix = sheet.getName();
  if (adj_prefix.trim('') != prefix.trim('')){
    let title = 'Adjacency Pair Error';
    let message = '⚠️ You should adapt naming rules of the project. E.g' + example_error
    alertMessageTitle(title,message)
  }

}

// function yes no 
function response(title, message) {
  return ui.alert(title, message, ui.ButtonSet.YES_NO);
}

// function alert error naming convention
function alertMessageTitle(title, message) {
  ui.alert(title, message, ui.ButtonSet.OK);
} 


// function protect range after reviewed
function protect(rowIndex, columnIndex){
  let protection = sheet.getRange(rowIndex, columnIndex).protect().setDescription('This range is protected and you do not have permission to edit it');
  protection.addEditors([
    'phongnt@ftech.ai', 'nguyenkytungcntt04@gmail.com'
  ])
  return protection;
}

function AIML(cellRange, intent){
  let rowIndex = cellRange.getRow();
  let columnIndex = cellRange.getColumn();
  
  if (['object', 'adj'].indexOf(header[columnIndex-1].toString().toLowerCase().trim(' ')) != -1){
    // construct AIML 
    let templateAIML = getSheetByName('AIML_'+sheet.getName());
    // let header = sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0];
    let columnIndex_object = getColumnIndexbyName('object');
    let pattern_name = templateAIML.getRange(2,1,templateAIML.getLastRow()-1,1).getValues();
    // let aiml_pattern = templateAIML.getRange(2,2,templateAIML.getLastRow()-1,1).getValues();
    let template;
    let adj = sheet.getRange(rowIndex, getColumnIndexbyName('adj')).getValue();
    let intent = adj.toString().split('.')[1];
    for (let i = 0; i < pattern_name.length; i++){
      if (pattern_name[i][0] == intent){
        template = templateAIML.getRange(i+2, 2, 1, 1).getValues();
        break;
      }
    }
    
    templates = processMultiplelines(template)
    let object = sheet.getRange(rowIndex, columnIndex_object).getValue().toString();
    let aiml_constructor = '';
    for (let t in templates){
      aiml_constructor += templates[t][0].replace(/{object}/gi, object) + '\n'
    }
    return aiml_constructor;
  }
  
}

function getColumnIndexbyName(column_name){
  for (let i = 0; i < header.length; i++){
    if (header[i].toString().toLowerCase().trim(' ') == column_name){
      return obj_column_index = i+1;
    }
  }

}

function getSheetByName(name){
  let target_sheet = SpreadsheetApp.getActive().getSheetByName(name);
  return target_sheet;
}

function setIntent(){
  let cellRange = sheet.getActiveCell();
  let rowIndex = cellRange.getRow();
  let columnIndex = cellRange.getColumn();
  let adj = cellRange.getValue();
  intent = adj.toString().split('.')[1]
  sheet.getRange(rowIndex,columnIndex+3).setValue('Intent: ' + intent);
  bold(sheet.getRange(rowIndex,columnIndex+3), 'Intent')

}


function processMultiplelines(range) {
  var output = [];
  for (var i in range) {
    var celLen = 1;
    var c1 = range[i].map(function(e, i){
      var cell = e.toString().split("\n"); // Modified
      var len = cell.length;
      if (len == 1) {
        return cell[0];
      } else if (len > 1) {
        celLen = celLen > len ? celLen : len;
        var t2 = [];
        for (var k=0; k<cell.length; k++) {
          t2.push(cell[k]);
        }
        return t2;
      }
    });
    var c2 = c1.map(function(e, i){
      var r = [];
      if (!Array.isArray(e)) {
        for (var k=0; k<celLen; k++) {
          r.push(e);
        }
      } else {
        for (var k in e) {
          r.push(e[k]);
        }
        if (e.length < celLen) {
          for (var m=0; m<celLen - e.length; m++) {
            r.push("");
          }
        }
      }
      return r;
    });
    var c3 = c2[0].map(function(e, i){return c2.map(function(f, j){return c2[j][i]})});
    Array.prototype.push.apply(output, c3);
  }
  return output;
}

// function insert checkbox
function insertCheckboxes(rowIndex, columnIndex) {
  let range = sheet.getRange(rowIndex, columnIndex);
  range.insertCheckboxes();
}

// function bold text
function bold(range, csvWords) {
  const rIndex = range.getRow();
  const cIndex = range.getColumn();
  const values = range.getValues();
  const rawWords = csvWords.split(' ');
  const words = [];
  rawWords.forEach(word => {
    words.push(word.trim());
  });


  for (let rowIndex = 0; rowIndex < values.length; rowIndex++) {
    const row = values[rowIndex];
    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      const value = row[colIndex];
      if (value != '' && value != null && value != undefined) {
        if (checkWords(value, words)) {
          setBoldFormat(value, words, (rowIndex + rIndex), (colIndex + cIndex));
        }
      }
    }
  }
}

function checkWords(value, words) {
  const wordArray = value.match(/\b(\S+)\b/g);
  const hasWord = words.some((word) => wordArray.indexOf(word) !== -1);
  return hasWord;
}

function setBoldFormat(value, words, rowIndex, colIndex) {
  const range = sheet.getRange(rowIndex, colIndex);
  const boldX = SpreadsheetApp.newTextStyle().setBold(true).build();
  for (let wordIndex in words) {
    let word = words[wordIndex];
    const richTextValue = range.getRichTextValue().copy();
    const startIndex = value.indexOf(word);
    if (startIndex >= 0) {
      const endIndex = startIndex + word.length;
      const formattedOutput = richTextValue.setTextStyle(startIndex, endIndex, boldX).build();
      range.setRichTextValue(formattedOutput);
      SpreadsheetApp.flush();
    }
}
}

function timenow() {
  let timezone = SpreadsheetApp.getActive().getSpreadsheetTimeZone();

  let now = Utilities.formatDate(new Date(), SpreadsheetApp.getActive().getSpreadsheetTimeZone(), "MMM, d yyyy HH:mm")
  return now;
}

// function to get data
function getItemdata(rowIndex, item){
  let message = cellRange(rowIndex, item).getValue();
  return message.toString().split('\n');

}

// function to get skills data
function getSkills(){
  let branches = sheet.getRange(3, getColumnIndexbyName('branch'), sheet.getLastRow()-2, 1).getValues();
  let units = sheet.getRange(3, getColumnIndexbyName('unit'), sheet.getLastRow()-2, 1).getValues();
  let prevBValue = '';
  let preUValue = ''
  let skillsRend = []
  for(let u in units){
    if(units[u][0].length > 0){
      if(preUValue != units[u][0]){
        preUValue = units[u][0]
      }
    }else{
      units[u][0] = preUValue;
    }
  }
  let bAndA = {}
  for(let v in branches){
    if(branches[v][0].length > 0){
      if(prevBValue != branches[v][0]){
        if(skillsRend.length > 0){
          skillsRend[skillsRend.length-1]["adjaceny_pair"] = skillsRend[skillsRend.length-1]["adjaceny_pair"]
        }
        skillsRend.push({
          "skill_name":branches[v][0],
          "image":"",
          "domain_name": units[v][0],
          "description": "",
          "adjaceny_pair": []
        })
        prevBValue = branches[v][0];
      }
    }
    else{
      //branches[v][0] = prevBValue;
      let adjGet = getAdj(v)
      if (adjGet){
        skillsRend[skillsRend.length-1]["adjaceny_pair"].push(getAdj(v))
      }
      
    }
  }
  console.log(skillsRend)
  return JSON.stringify(skillsRend)
}

// function to export file
// function saveFile(id= '1izDw6cJOJK-kgTfFZwFu5_UeigYJm8Fy'){
//   let file_name = sheet.getName() + '_' + timenow();
//   let data = getSkills();
//   let folder = DriveApp.getFolderById(id);
//   folder.createFile(file_name+'.json', data)
// }

// function to check Null

function checkNull(rowIndex, header){
  if (cellRange(rowIndex, header) != ''){
    return false
  } 
  return true
  
}

// function to get Adjacency Pair 

function getAdj(rowIndex){
  let adj_name = cellRange(rowIndex,'adj').getValue().toString();
  let intent = adj_name.toString().slice(adj_name.toString().indexOf('.') + 1);
  let description = cellRange(rowIndex, 'description').getValue().toString();
  let meta = cellRange(rowIndex, 'metadata').getValue();

  if (sheet.getRange(rowIndex, getColumnIndexbyName('confirmed')).isChecked() === true){
    let adj_data = {
    "adjacency_pair_name": adj_name,
    "intent": intent,
    "description": description,
    "metadata": meta,
    "messages": getItemdata(rowIndex,'message'),
    "responses": getItemdata(rowIndex, 'response'),
    "aiml": getItemdata(rowIndex, 'aiml')
    }
    return adj_data;
  } 
}

function cellRange(rowIndex, header){
  return sheet.getRange(rowIndex, getColumnIndexbyName(header));
}


function loadForm(){
  const width = 560;
  const height = 420;
  const html = HtmlService.createHtmlOutputFromFile('pattern');
  html.setWidth(width).setHeight(height);
  // var ui = SpreadsheetApp.getUi();
  ui.showModalDialog(html,"AIML Pattern Add-in")
}

function fetchData(data){
  function setName(){
    var targetedName = SpreadsheetApp.getActiveSheet().getName().toString();
    console.log(targetedName)
    if (targetedName.indexOf('AIML_') > -1){
      name = targetedName;
      
    } else{
      name = 'AIML_' + targetedName;
    }
    return name;
  }
  name = setName()

  var rowIndex = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name).getLastRow() + 1;
  if (data.pattern.toString().indexOf('_') > -1 && data.template.toString().indexOf('{object}') > -1){
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name).getRange(rowIndex, 1).setValue(data.pattern);
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name).getRange(rowIndex, 2).setValue(data.template);
  } else{
    alertMessageTitle('Naming Convention Error', '⚠️ You should adapt naming rules of the project' )
  }
  
  
}

function flattenArray(arr){
  var flattened_arr = [] ;
  for (var i = 0; i < arr.length - 1; i++) {
    flattened_arr.push(arr[i][0]);
  }
  return flattened_arr
}

function test(){
  const service = new Service(api="https://be-cdms.dev.ftech.ai/get_dummy_nlg")
  service.getAPIs();

}

function json() {
   var htmlOutput = HtmlService.createHtmlOutputFromFile('json').setWidth(640).setHeight(640);
   SpreadsheetApp.getUi().showModalDialog(htmlOutput,'Display');
}


function getAPI(rowIndex){
  var response = UrlFetchApp.fetch("https://be-cdms.dev.ftech.ai/get_dummy_nlg");
  var data = JSON.stringify(JSON.parse(response), null, 4)
  var nlgSheet = getSheetByName('NLG_name'),
      system_intent = nlgSheet.getRange(rowIndex,2).getValue().replace('/','').toString();
  console.log(system_intent)
  var system_intent_template = Object.keys(JSON.parse(response).templates);
  if (system_intent_template.indexOf(system_intent) != -1){
    var message = {}
    message[`${system_intent}`] = JSON.parse(response).templates.utter_office_ask_info;
  } else{
    message = 'This message should be defined in cdms'
  }
  nlgSheet.getRange(rowIndex,3).setValue(json2yaml(message))

}


class Service{

  constructor(api){
    this.api = api
  }

  getAPIs(){
    var response = UrlFetchApp.fetch(api);
    var data = JSON.stringify(JSON.parse(response), null, 4)
    console.log(data)
  }

}


