import { injectable, inject } from "inversify";
import SERVICE_IDENTIFIER from "../IoC/identifiers";
import "reflect-metadata";
import { ParentSheet, ChildSheet, SheetData } from "../Models";
import type { GetSheets, GetSheetData, CopySheetData } from "./Interfaces";
import { Result } from "../Models/Result";

@injectable()
export default class SheetsCopySheetData implements CopySheetData {
  
  readonly getSheets: GetSheets;
  readonly getSheetData: GetSheetData;

  constructor(@inject(SERVICE_IDENTIFIER.GETSHEETS) getSheets: GetSheets,
    @inject(SERVICE_IDENTIFIER.GETSHEETDATA) getSheetData: GetSheetData) {
      this.getSheets = getSheets;
      this.getSheetData = getSheetData;
  }

  execute(sheetName: string): Result<string> {
    let parentSheet: ParentSheet = ParentSheet.getInstance();
    let externalSheets: ChildSheet[] = this.getSheets.externalSheetsByName(sheetName);
    let sheetData: SheetData = this.getSheetData.execute(externalSheets);
    if (sheetData.data.length > 0) {
      let newRange: GoogleAppsScript.Spreadsheet.Range = parentSheet.setRange(sheetData);
      newRange.setValues(sheetData.data);
      return new Result<string>(true, sheetName, "Data copied successfully");
    } else {
      return new Result<string>(false, sheetName, "No data to copy");
    }
  }
}