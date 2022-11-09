declare global {
  var mockConfigSheetValues: string[][];
  function setDefaultMockConfigSheetValues(): any;
  function getMockConfigSheetValues(startColumn: number, numRows: number): any;
}
export {}