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

const display = class Display{

  showPrompt(title, message, buttons){
    var response = ui.prompt(title, message, buttons);
    if (response.getSelectedButton() == ui.Button.OK){
      return response.getResponseText();
    }else{
      return 'undefined'
    }
  }

  showAlert(title, message, buttons){
    var response = ui.alert(title, message, buttons);
    if (response == ui.Button.OK || response == ui.Button.YES){
      return true;
    }else{
      Logger.log("This work isn't proceeded")
    }
  }
  
}

