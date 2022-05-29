const display = class Display{

  showPrompt(title, message, buttons){
    var response = ui.prompt(title, message, buttons);
    if (response.getSelectedButton() == ui.Button.OK){
      return response.getResponseText();
    }else{
      return 'undefined'
    }
  }

  showAlert(title, message, buttons){
    var response = ui.alert(title, message, buttons);
    if (response == ui.Button.OK || response == ui.Button.YES){
      return true;
    }else{
      Logger.log("This work isn't proceeded")
    }
  }
  
}

