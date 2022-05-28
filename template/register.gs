// TODO create a template for skill name 
const si = class SheetImport{

  constructor(){
    
  }
  
  createSheet(){
    var name = display.prototype.showPrompt('Skill Name', 
                                            'Enter your name that do you want to call', 
                                            ui.ButtonSet.OK_CANCEL);
    
    var db_skill_name = utils.prototype.getCurrentSkillName();
    if (db_skill_name.indexOf(name) == -1){
      // create domain sheet
      var ds = SHEET.insertSheet().setName(name);
      this.createOnHeader(name, headerProperties.data);

      // create aiml sheet
      var aiml = SHEET.insertSheet().setName(`AIML_${name}`)
      this.createOnHeader(`AIML_${name}`, headerProperties.aiml)

      // create nlg sheet
      var nlg = SHEET.insertSheet().setName(`NLG_${name}`)
      this.createOnHeader(`NLG_${name}`, headerProperties.nlg)
    } else{
        var error_response = display.prototype.showAlert('Skill name already exists',
                                                          'Do you want to set another name',
                                                          ui.ButtonSet.OK_CANCEL);
        if (error_response ==  true){
          si.prototype.createSheet()
        }

    }
    
  }

  createOnHeader(sheet, header){
    for (var i=0; i < header.length; i++){
      utils.prototype.getSheetbyName(sheet)
                     .getRange(1,i+1)
                     .setValue(header[i])
                     .setBorder(true, true, true, true, true, true)
                     .setBackground('#fbbc04')
                     .setFontSize(11)
                     .setFontStyle('blod')
                     .setHorizontalAlignment('center')
                     .setVerticalAlignment('middle');                                    
    }

  }


}

