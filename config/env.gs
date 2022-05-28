try{
  // set a property in property store
  const scriptProperties = PropertiesService.getScriptProperties();

  scriptProperties.setProperty('NLG_TEMPLATE_API', 'https://be-cdms.dev.ftech.ai/get_dummy_nlg')

  // const documentProperties = PropertiesService.getDocumentProperties();

  var headerProperties = {aiml: ['No', 'User intent', 'Template'],
                          nlg: ['No', 'System intent', 'Messages'],
                          data: ['No', 'Unit', 'Branch', 'Adj', 'Description', 
                                'Scope', 'User intent', 'Message', 'Response', 'Keyword',
                                'Object', 'AIML', 'Metadata', 'Note', 'Annotator', 
                                'Passed', "Failed", 'Reviewer']
                          }

  scriptProperties.setProperties(headerProperties)
} catch(err){
  Logger.log('Failed with error %s', err.message);
}

const NLG_API = 'https://be-cdms.dev.ftech.ai/get_dummy_nlg'
