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

// TODO construct an aiml that can be imported to COMET Core

const agen = class AIMLGenerator{
  constructor(){

  }

  questionSchemas(question, response){
  // let root = XmlService.createElement('aiml');
  //     root.setAttribute('version', '2.0');
    let category = XmlService.createElement('category')
      let pattern = XmlService.createElement('pattern')
          .setText(question)
      let template = XmlService.createElement('template')
        let srai = XmlService.createElement('srai')
          .setText(response)
      template.addContent(srai)
      category.addContent(pattern)
      category.addContent(template)
    // root.addContent(category)

    let document = XmlService.createDocument(category);
    let user_ask = XmlService.getPrettyFormat().format(document).replace('<?xml version="1.0" encoding="UTF-8"?>', "").trim();
    return user_ask;
  }

  metaSchemas(response, url){

    // schemas for image response


  }

  multiPlainTextSchemas(message_list, _pattern){

    // schemas for multiple plain text
    let category = XmlService.createElement('category');
      let pattern = XmlService.createElement('pattern');
          pattern.setText(_pattern);
      let template = XmlService.createElement('template');
          let random = XmlService.createElement('random');
              message_list.forEach(mes =>{
                let li = XmlService.createElement('li');
                    li.setText(mes)
                random.addContent(li)
              })
      template.addContent(random);
    category.addContent(pattern);
    category.addContent(template);
    
    let document = XmlService.createDocument(category);
    let system_response = XmlService.getPrettyFormat().format(document).replace('<?xml version="1.0" encoding="UTF-8"?>', "").trim();
    return system_response;        
                  
  }

  




}


// <?xml version="1.0" encoding="UTF-8"?>
// <aiml version="2.0">
//      <category>
//         <pattern>XTEST SEND MULTI PLAIN TEXT FOR RANDOMLY PICK</pattern>
//         <template>
//             <random>
//                 <li>Message 1</li>
//                 <li>Message 2</li>
//                 <li>Message 3</li>
//             </random>
//         </template>
//     </category>
// </aiml>




// Log the title and labels for the first page of blog posts on
// Google's The Keyword blog.
function parseXml() {
  let url = 'https://blog.google/rss/';
  let xml = UrlFetchApp.fetch(url).getContentText();
  let document = XmlService.parse(xml);
  let root = document.getRootElement();

  let channel = root.getChild('channel');
  let items = channel.getChildren('item');
  items.forEach(item => {
    let title = item.getChild('title').getText();
    let categories = item.getChildren('category');
    let labels = categories.map(category => category.getText());
    console.log('%s (%s)', title, labels.join(', '));
  });
}

// Create and log an XML representation of first 10 threads in your Gmail inbox.
function createXml() {
  let root = XmlService.createElement('aiml');
  root.setAttribute('version', '2.0')
  let threads = GmailApp.getInboxThreads()
  threads = threads.slice(0,10); // Just the first 10
  threads.forEach(thread => {
    let child = XmlService.createElement('thread')
        .setAttribute('messageCount', thread.getMessageCount())
        .setAttribute('isUnread', thread.isUnread())
        .setText(thread.getFirstMessageSubject());
    root.addContent(child);
  });
  let document = XmlService.createDocument(root);
  let xml = XmlService.getPrettyFormat().format(document);
  console.log(xml);
}











