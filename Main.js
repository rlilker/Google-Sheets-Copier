const addGetter_ = (name, value, obj = this) => {
  Object.defineProperty(obj, name, {
    enumerable: true,
    configurable: true,
    get() {
      delete this[name];
      return (this[name] = value());
    },
  });
  return obj;
};
//Global Variables
[
  ['ss', () => SpreadsheetApp.getActiveSpreadsheet()],
  ['CurrentSheet', () => ss.getActiveSheet()],
  ['CurrentCell', () => CurrentSheet.getActiveCell()] ,
  ['SelectedSourceIndex', () => 0],
  ['ConfigSheetName', () => "Config"],
  ['ExternalSheetUrlColumnRef', () => "N3"],
  ['ExternalSheetNameColumnRef', () => "O3"],
  ['ExternalSheetRangeColumnRef', () => "P3"]

].forEach(([n, v]) => addGetter_(n, v));

/**
 * Get the externals sheets from those listed in the Config.
 * @return {Array} The url[0], sheet name[1], and range[2] where the source data is held 
 */
function externalSheets() {

  var externalSheets = [];

  var sheet = ss.getSheetByName(ConfigSheetName);
  var sheetNames = getExternalSheetColumnData(sheet, ExternalSheetNameColumnRef);
  var sheetUrls = getExternalSheetColumnData(sheet, ExternalSheetUrlColumnRef);
  var sheetRanges = getExternalSheetColumnData(sheet, ExternalSheetRangeColumnRef);

  if (sheetNames.length === sheetUrls.length && sheetNames.length === sheetRanges.length) {
    for(x = 0; x<sheetNames.length; x++) {
      var externalSheet = [sheetUrls[x][0], sheetNames[x][0], sheetRanges[x][0]];
      externalSheets.push(externalSheet);
    }
  } else {
    throw new Error(`Config data not correctly set up. The child Spreadsheet Url, it's Sheet name, and the Range to copy must all be provided on every row`);
  }
  return externalSheets;
}

function getExternalSheetColumnData(sheet, columnRef) {
  var sheetColumnStart = A1NotationResolver.cellA1ToIndex(columnRef);
  var columnData = sheet.getSheetValues(sheetColumnStart.row, sheetColumnStart.col, sheet.getLastRow(), 1);
  return columnData.filter(n => n[0].length > 0); //Filter out blank data
}

function externalSheetsByName(sheetName) {
  return externalSheets().filter(n => sheetName == n[1]);
}