import { injectable, inject } from "inversify";
import SERVICE_IDENTIFIER from "../IoC/identifiers";
import "reflect-metadata";
import type { A1NotationResolver } from "../A1Notation/Interfaces/A1NotationResolver";
import { Config, ParentSheet, ChildSheet } from "../Models";
import { GetSheets } from "./Interfaces";

@injectable()
export class SheetsGetSheets implements GetSheets {
  
  readonly a1NotationResolver: A1NotationResolver;

  constructor(@inject(SERVICE_IDENTIFIER.A1NOTATIONRESOLVER) a1NotationResolver: A1NotationResolver) {
    this.a1NotationResolver = a1NotationResolver;
  }

  /**
   * Get the externals sheets from those listed in the Config.
   * @return {Array<ChildSheet>} Containing the url, sheet name, and range where the source data is held 
   */
  list(): ChildSheet[] {

    let parentSheet = ParentSheet.getInstance();
    let config = Config.getInstance();
    let childSheets: ChildSheet[]  = [];

    let sheet = parentSheet.spreadsheet().getSheetByName(config.configSheetName);
    let sheetNames = this.getExternalSheetColumnData(sheet, config.externalSheetNameColumnRef);
    let sheetUrls = this.getExternalSheetColumnData(sheet, config.externalSheetUrlColumnRef);
    let sheetRanges = this.getExternalSheetColumnData(sheet, config.externalSheetRangeColumnRef);

    if (sheetNames.length === sheetUrls.length && sheetNames.length === sheetRanges.length) {
      for(let x = 0; x<sheetNames.length; x++) {
        var externalSheet = new ChildSheet(sheetNames[x][0], sheetUrls[x][0], sheetRanges[x][0]);
        childSheets.push(externalSheet);
      }
    } else {
      throw new Error(`Config data not correctly set up. The child Spreadsheet Url, it's Sheet name, and the Range to copy must all be provided on every row`);
    }
    return childSheets;
  }

  private getExternalSheetColumnData(sheet: GoogleAppsScript.Spreadsheet.Sheet | null, columnRef: string): any[][] {
    var sheetColumnStart = this.a1NotationResolver.cellA1ToIndex(columnRef);
    if (sheet != null) {
      var columnData = sheet.getSheetValues(sheetColumnStart.row, sheetColumnStart.col, sheet.getLastRow(), 1);
      return columnData.filter(n => n[0].length > 0); //Filter out blank data
    } else {
      return [];
    }
  }

  externalSheetsByName(sheetName: string) {
    return this.list().filter(sheet => sheetName == sheet.name);
  }
}