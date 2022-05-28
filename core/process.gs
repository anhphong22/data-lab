const process = class Process{

  constructor(){

  }

  // function to check adjacency pair name whether adapting naming convention or not
  checkNamingConvention(adj_prefix, err_message){
    var _prefix = SHEET.getName();
    if (adj_prefix.trim('') != _prefix.trim('')){
      var response = display.prototype.showAlert('Naming Convention Error',
                                                  `You should adapt naming rules of the project. E.g ${err_message}`,
                                                  ui.ButtonSet.OK);
    }else{
      Logger.log('pass')
    }

  }
  
}
