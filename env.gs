try {
  // Set a property in each of the three property stores.
  const scriptProperties = PropertiesService.getScriptProperties();
  // const userProperties = PropertiesService.getUserProperties();
  // const documentProperties = PropertiesService.getDocumentProperties();

  scriptProperties.setProperty('SERVER_URL', "https://be-cdms.dev.ftech.ai/get_dummy_nlg");
  // userProperties.setProperty('DISPLAY_UNITS', 'metric');
  // documentProperties.setProperty('SOURCE_DATA_ID',
      // '1j3GgabZvXUF177W0Zs_2v--H6SPCQb4pmZ6HsTZYT5k');
} catch (err) {
  // TODO (developer) - Handle exception
  Logger.log('Failed with error %s', err.message);
}
