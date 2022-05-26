class Utils{
  
  // constructor function
  constructor(){
    this.ui = SpreadsheetApp.getUi();
  }

  // function to get sheet by name
  getSheetbyName(name){
    var sheet = SpreadsheetApp.getActive().getSheetByName(name);
    return sheet;
  }

  // function to get cell range
  getCellRange(rIndex, cIndex){

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
    var data = getSheetByName(name).getRange(rIndex, cIndex, rIndexOffset, cIndexOffset).getValues();
    if (header == 'header'){
      return data[0];
    } else{
      return data;
    }
    
  }


  // function flatten 2D array to 1D one
  flattenArray(arr){
    var flattened_arr = [] ;
    for (var i = 0; i < arr.length - 1; i++) {
      flattened_arr.push(arr[i][0]);
    }
    return flattened_arr;
  } 

  // function to archive sheets
  archiveSheet(){
    var sheets = SpreadsheetApp.getActive().getSheets();
    for (var i=0; i < sheets.length; i++){
      if (sheets[i].getName() != 'Sheet1'){
        sheets[i].hideSheet()
      }
    }
  }

}


class Pandas{

  constructor(){
    var utils = new Utils;
  }

  // function to read data
  read_csv(name, rIndex, cIndex, rIndexOffset, cIndexOffset){
    var data = utils.getData(name, rIndex, cIndex, rIndexOffset, cIndexOffset);
    return data.slice(1);
  }

}


function test(){
  var u = new Utils;
  // console.log(u.getData('name',1,1,1,19, 'header'))

  var pd = new Pandas;
  console.log(pd.read_csv('AIML_name', 1, 1, u.getSheetbyName('AIML_name').getLastRow(), u.getSheetbyName('AIML_name').getLastColumn()))
}

