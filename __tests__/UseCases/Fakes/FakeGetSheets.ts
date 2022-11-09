import { ChildSheet } from "../../../src/Models";
import { GetSheets } from "../../../src/UseCases/Interfaces";

export class FakeGetSheets implements GetSheets {
  
  list(): ChildSheet[] {
    let childSheets: ChildSheet[]  = [];
    childSheets.push(new ChildSheet("sheetName", "sheetUrl", "A1:A1"));
    childSheets.push(new ChildSheet("sheetName", "differentSheetUrl", "A1:A1"));
    childSheets.push(new ChildSheet("anotherSheetName", "sheetUrl", "A1:A1"));
    return childSheets;
  }

  externalSheetsByName(sheetName: string) {
    return this.list().filter(sheet => sheetName == sheet.name);
  }
}