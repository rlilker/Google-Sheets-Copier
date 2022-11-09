import { SheetData } from "./SheetData";

/**
 * Singleton representing the main spreadsheet to copy the data into.
 */
export class ParentSheet {
  private static instance: ParentSheet;

  spreadsheet() {
    return SpreadsheetApp.getActiveSpreadsheet();
  }
  activeSheet() {
    return this.spreadsheet().getActiveSheet();
  }
  activeCell() {
    return this.activeSheet().getActiveCell();
  }
  sheetNames() {
    return this.spreadsheet().getSheets().map(x => x.getName());
  }
  setRange(sheetData: SheetData) {
    //Start with the current cell and stretch the range out by the number of rows and cols retrieved from the child sheet(s)
    let activeCell = this.activeCell();
    let currentCol = activeCell.getColumn();
    var currentRow = activeCell.getRow();
    return this.activeSheet().getRange(currentRow, currentCol, sheetData.rows(), sheetData.columns());
  }

  constructor() { }
  public static getInstance(): ParentSheet {
    if (!ParentSheet.instance) {
      ParentSheet.instance = new ParentSheet();
    }
    return ParentSheet.instance;
  }
}