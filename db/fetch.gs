function fetch(){
  var nlg_template = UrlFetchApp.fetch(NLG_API);
  console.log(JSON.stringify(JSON.parse(nlg_template), null, 4))
}
