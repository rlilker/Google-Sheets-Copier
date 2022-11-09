import { ChildSheet } from "../../Models";

export interface GetSheets {
  list(): ChildSheet[];
  externalSheetsByName(sheetName: string): ChildSheet[];
}