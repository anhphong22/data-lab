var utils = new Utils();

class Init{

  constructor(name){
      this.name = name;
      this.header = [ 'No',
                      'Unit',
                      'Branch',
                      'Adj',
                      'Description ',
                      'Scope',
                      'Intent',
                      'Message',
                      'Response',
                      'Keyword',
                      'Object',
                      'AIML',
                      'Metadata',
                      'Note',
                      'Annotator',
                      'Confirmed',
                      'Reviewer' ];
  }

  // setup header
  setup(){

    // create domain sheet
    var ds = SpreadsheetApp.getActive().insertSheet().setName(this.name);
    this.putHeader(ds.getName(), this.header)

    // create aiml sheet
    var aiml = SpreadsheetApp.getActiveSpreadsheet().insertSheet().setName('AIML_'+ this.name);
    this.putHeader(aiml.getName(), ['No', 'User intent', 'Template'])
    
    // create nlg sheet
    var nlg = SpreadsheetApp.getActiveSpreadsheet().insertSheet().setName('NLG_'+ this.name);
    this.putHeader(nlg.getName(), ['No', 'System intent', 'Messages'])
    
  }

  // setup data sheet
  putHeader(sheet_name, header){
    for (var i=0; i <= header.length - 1; i++){
      utils.getSheetbyName(sheet_name).getRange(1,i+1)
                                      .setValue(header[i])
                                      .setBorder(true, true, true, true, true, true)
                                      .setBackground('#fbbc04')
                                      .setFontSize(11)
                                      .setFontStyle('bold')
                                      .setHorizontalAlignment('center')
                                      .setVerticalAlignment('middle');
    }
  }

}



