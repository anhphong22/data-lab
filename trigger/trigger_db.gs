/**
 * Creates two time-driven triggers.
 * @see https://developers.google.com/apps-script/guides/triggers/installable#time-driven_triggers
 */
function createTimeDrivenTriggers() {
  // Trigger every 6 hours.
  ScriptApp.newTrigger('test')
      .timeBased()
      .everyMinutes(1)
      .create();
}

/**
 * Creates a trigger for when a spreadsheet opens.
 * @see https://developers.google.com/apps-script/guides/triggers/installable
 */
function createSpreadsheetOpenTrigger() {
  const ss = SpreadsheetApp.getActive();
  ScriptApp.newTrigger('myFunction')
      .forSpreadsheet(ss)
      .onOpen()
      .create();
}