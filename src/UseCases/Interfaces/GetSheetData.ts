import { ChildSheet, SheetData } from "../../Models";

export interface GetSheetData {
  execute(sheets: ChildSheet[]): SheetData;
  getSheetId(sheetUrl: string): string;
}