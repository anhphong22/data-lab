
function main(){
  var domain = ui.prompt('Domain name:');
    if (domain.getSelectedButton() == ui.Button.OK){
      var domain_name = domain.getResponseText().toString();
    }

  var init = new Init(domain_name);
  init.setup()

}
