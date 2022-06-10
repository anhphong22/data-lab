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

function getPlanning(url = 'https://docs.google.com/spreadsheets/d/19lYcTDckv-7zek0p7vICFixscPFaarMt9WbCSwAAPFA/edit#gid=1115838130'){
  var SpreadSheet = SpreadsheetApp.openByUrl(url);
  var projectName = SpreadSheet.getName();

  var timelineSheet = SpreadSheet.getSheetByName('PRJ Timeline');

  var projectName = projectName.substring(
    projectName.indexOf("[") + 1, 
    projectName.lastIndexOf("]")
  );

  console.log(timelineSheet.getRange(11,4).getValue().split(','))
  


  
}