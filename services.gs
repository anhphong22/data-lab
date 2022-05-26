class API{

  constructor(){
    // configuration
  }
  
  // function to get api
  get(api){
    var response = UrlFetchApp.fetch(api);
    var data = JSON.stringify(JSON.parse(response), null, 4)
    return data;
  }

  // function to create api for response
  response(){

  }

}
