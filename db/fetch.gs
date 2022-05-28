

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
    // var message = {}
    // message[`${system_intents[i]}`] = json2yaml(temp)

  }


}