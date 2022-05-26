var api = new API;

function main(){
  var api_url = ScriptProperties.getProperty('SERVER_URL')
  console.log(api.get(api_url))
}
