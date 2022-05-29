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

const acon = class AIMLConstructor{
  constructor(){

  }

  questionSchemas(_template, _pattern){
  // let root = XmlService.createElement('aiml');
  //     root.setAttribute('version', '2.0');
    let category = XmlService.createElement('category')
      let pattern = XmlService.createElement('pattern')
          pattern.setText(_pattern)
      let template = XmlService.createElement('template')
        let srai = XmlService.createElement('srai')
            srai.setText(_template)
      template.addContent(srai)
      category.addContent(pattern)
      category.addContent(template)
    // root.addContent(category)

    // let document = XmlService.createDocument(category);
    // let user_ask = XmlService.getPrettyFormat().format(document).replace('<?xml version="1.0" encoding="UTF-8"?>', "").trim();
    return category;
  }

  answerSchemas(nlg, _pattern){
    let category = XmlService.createElement('category')
      let pattern = XmlService.createElement('pattern')
          pattern.setText(_pattern);
      let template = XmlService.createElement('template')
          template.setText(nlg)
    category.addContent(pattern)
    category.addContent(template)

    // let document = XmlService.createDocument(category);
    // let answer = XmlService.getPrettyFormat().format(document).replace('<?xml version="1.0" encoding="UTF-8"?>', "").trim();
    return category;
          
  }

  mulPlainTextSchemas(message_list, _pattern){
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

  singleImageSchemas(url, _pattern){
    /*
      <category>
          <pattern>XTEST SEND SINGLE IMAGE</pattern>
          <template><image>https://chatilly.com/images/cta01.jpg</image></template>
      </category>
    */

  }

  mulImageSchemas(urls, _pattern){
    /*
      <category>
        <pattern>XTEST MULTI IMAGES</pattern>
        <template>
            <image>
                <li>https://chatilly.com/images/cta01.jpg</li>
                <li>https://chatilly.com/images/cta02.jpg</li>
            </image>
        </template>
      </category>
    */

  }

  singleSlotSchemas(nlg, slot, _pattern){
    /*
      <category>
        <pattern>XTEST_SLOT MY NAME IS ^</pattern>
        <template>
            <li>/utter_name_of_user</li>
            <li><slots><slot>name</slot><value><star/></value></slots></li>
        </template>
      </category>
    */

  }

  mulSlotSchemas(nlg, slots, _pattern){
    /*
      <category>
        <pattern>XTEST_SLOTS MY NAME IS ^</pattern>
        <template>
            <li>/utter_name_of_user</li>
            <li>
                <slots>
                    <li><slot>name</slot><value><star/></value></li>
                </slots>
            </li>

        </template>
      </category>
    */

  }

  singleVideoSchemas(url, _pattern){
    /*
      <category>
        <pattern>XTEST SINGLE VIDEO</pattern>
        <template><video>http://www.w3schools.com/tags/movie.mp4</video></template>
      </category>
    */

  }

  mulVideoSchemas(urls, _pattern){
    /*
      <category>
        <pattern>XTEST MULTI VIDEOS</pattern>
        <template>
            <video>
                <li>https://www.w3schools.com/tags/movie.mp4</li>
                <li>https://www.w3schools.com/tags/movie.mp4</li>
            </video>
        </template>
      </category>
    */

  }

  urlSchemas(url, title, _pattern){
    /*
      <category>
        <pattern>XTEST SINGLE LINK</pattern>
        <template><link><title>Servusai</title><url>http://www.google.com</url></link></template>
      </category>
    */

  }

  singleButtonSchemas(button, title, _pattern){
    /*
      <category>
        <pattern>XTEST SINGLE SINGLE BUTTON</pattern>
        <template>
            <buttons><title>Servusai</title><postback>/general.greeting</postback></buttons>
        </template>
      </category>
    */

  }

  mulButtonSchemas(button_list, _pattern){
    // @param(button_list) 
    /*
      Example button_list = [
        {"Servurai 1": "/general.greeting"},
        {"Servurai 2": "/general.bye"}

      ]
    */

    /*
      <category>
        <pattern>XTEST SINGLE MULTI BUTTONS</pattern>
        <template>
            <buttons>
                <li><title>Servusai 1</title><postback>/general.greeting</postback></li>
                <li><title>Servusai 2</title><postback>/general.bye</postback></li>
            </buttons>
        </template>
      </category>
    */
    
  }

  mulMessagesSchemas(urls, image_url, message, _pattern){
    /*
      <category>
        <pattern>XTEST MULTI MESSAGES</pattern>
        <template>
            <li>Hello, this is the first message</li>
            <li><image>https://chatilly.com/images/cta01.jpg</image></li>
            <li>
                <video>
                    <li>https://www.w3schools.com/tags/movie.mp4</li>
                    <li>https://www.w3schools.com/tags/movie.mp4</li>
                </video>
            </li>
        </template>
      </category>
    */

  }

  

}













