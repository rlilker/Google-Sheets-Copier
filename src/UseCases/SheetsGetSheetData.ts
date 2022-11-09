import { injectable, inject } from "inversify";
import SERVICE_IDENTIFIER from "../IoC/identifiers";
import "reflect-metadata";
import type { A1NotationResolver } from "../A1Notation/Interfaces/A1NotationResolver";
import { RangeIndices, SheetData, ChildSheet } from "../Models";
import { GetSheetData } from "./Interfaces";

@injectable()
export class SheetsGetSheetData implements GetSheetData {
  
  readonly a1NotationResolver: A1NotationResolver;

  constructor(@inject(SERVICE_IDENTIFIER.A1NOTATIONRESOLVER) a1NotationResolver: A1NotationResolver) {
    this.a1NotationResolver = a1NotationResolver;
  }

  execute(sheets: ChildSheet[]): SheetData {
    let collatedSheetData: SheetData | undefined;
    for (var i=0 ; i<sheets.length ; i++) {
      try {
        let sheetId: string = this.getSheetId(sheets[i].url);
        let sheetName: string = sheets[i].name;
        let sheetRange = sheets[i].range;
        
        var spreadsheet = SpreadsheetApp.openById(sheetId);
        var sheet = spreadsheet.getSheetByName(sheetName);
        if (!sheet) {
          throw new Error(`No Sheet exists with the name ${sheetName}`);
        } else {
          let range = sheet.getRange(sheetRange);
          let rangeA1: string = range.getA1Notation();
          let rangeAsIndices: RangeIndices = this.a1NotationResolver.rangeA1ToIndices(rangeA1);
          let sheetValues: any[][] = range.getValues().filter(n => n[0] != '');
  
          if (collatedSheetData) {
            collatedSheetData.append(sheetValues);
          } else {
            collatedSheetData = new SheetData(sheetName, rangeA1, rangeAsIndices, sheetValues);
          }
        }
      } catch(err: any) {
        throw new Error(`Error getting child Sheet Data: ${err.message}`);
      }
    }
    if (collatedSheetData) {
      return collatedSheetData;
    } else {
      throw new Error(`Error getting child Sheet Data: No sheet data found`);
    }
  }
  
  getSheetId(sheetUrl: string): string {
    let sheetUrlParts: string[] = sheetUrl.split('/');
    for(let i=0; i<sheetUrlParts.length; i++) {
      if (i > 1 && sheetUrlParts[i-2] === "spreadsheets" && sheetUrlParts[i-1] == "d") {
        return sheetUrlParts[i];
      }
    }
    throw new Error(`Invalid Sheet Url: ${sheetUrl}`);
  }
}