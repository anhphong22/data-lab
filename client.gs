function onOpen(e) {
  const ui = SpreadsheetApp.getUi();
  var exportData = ui.createMenu("Export")
    .addItem('JSON', 'download')
    .addSeparator()
    .addItem("AIML", "aiml")
    .addItem("FAQ", "faq")
    .addItem("NLG", "nlg")
  ui.createMenu("Utilities")
   .addItem("Add Pattern", "loadForm")
   .addItem("Testing main function", "review")
   .addSeparator()
   .addSubMenu(exportData)
   .addToUi();
}
