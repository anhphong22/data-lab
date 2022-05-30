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

const utils = class Utils{

  // constructor function
  constructor(){
    
  }

  // function to get sheet by name
  getSheetbyName(name){
    var sheet = SHEET.getSheetByName(name);
    if (sheet != null){
      return sheet;
    }else{
      Logger.log(`The ${name} spreadsheet was not found`)
    }
    
  }

  /**
 * A function that gets the current selection, in A1Notation.
 *
 * @customfunction
 */
  getCellRange(){
    return SHEET.getActiveRange().getA1Notation();

  }

  // function to get column index by name
  getColumnIndexbyName(header, column_name){
    var obj_column_index;
    for (let i = 0; i < header.length; i++){
      if (header[i].toString().toLowerCase().trim(' ') == column_name){
        return obj_column_index = i+1;
      }
    }
  }

  // function to get header list
  getData(name, rIndex, cIndex, rIndexOffset=1,cIndexOffset, header){
    var data = this.getSheetbyName(name).getRange(rIndex, cIndex, rIndexOffset, cIndexOffset).getValues();
    if (header == 'header'){
      return data[0];
    } else{
      return data;
    }

  }

  // function flatten 2D array to 1D one
  flattenArray(arr){
    Logger.log('Flatten successfullly!')
    return arr = [].concat.apply([], arr);
  }

  // function to archive sheets
  archiveSheet(){
    var sheets = SHEET.getSheets();
    for (var i=0; i < sheets.length; i++){
      if (sheets[i].getName().replace(/[0-9]/g, '').toLowerCase() != 'sheet'){
          sheets[i].hideSheet()
      }
        
    }

    Logger.log(`Archived ${sheets.length - 1} sheets`)
  }

  // function to get sheet names in Spreadsheet
  getCurrentSkillName(){
    var sheets = SHEET.getSheets();
    var nameSheets = [];

    for (var i=0; i < sheets.length; i++){
      nameSheets.push(sheets[i].getName());
    }
    return nameSheets;
  }

}
