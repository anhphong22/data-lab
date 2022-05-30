// Copyright 2022 NLP VA-Team
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      https://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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
