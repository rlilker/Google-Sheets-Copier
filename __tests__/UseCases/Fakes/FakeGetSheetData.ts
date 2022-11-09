import { ChildSheet, SheetData, RangeIndices, RangeIndex } from "../../../src/Models";
import { GetSheetData } from "../../../src/UseCases/Interfaces";

export class FakeGetSheetData implements GetSheetData {
  
  execute(sheets: ChildSheet[]): SheetData {
    let data: any[][] = [];
    if (sheets.length > 0) {
      data.push([123]);
      data.push([345]);
      data.push([789]);
    }
    let rangeAsIndices = new RangeIndices(new RangeIndex(1,1), new RangeIndex(1,1));
    return new SheetData("sheetName", "A1:A1", rangeAsIndices, data);
  }
  
  getSheetId(sheetUrl: string): string {
    return "sheetUrl";
  }
}