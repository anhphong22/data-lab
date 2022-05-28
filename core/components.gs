function insertCheckbox(rIndex=3, cIndex=4) {
  SpreadsheetApp.getActive().getActiveSheet()
                .getRange(rIndex, cIndex).insertCheckboxes();
  console.log('checkpoint')
}
