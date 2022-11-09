import { SheetsCopySheetData } from "../../src/UseCases"
import { FakeGetSheets, FakeGetSheetData } from "./Fakes";

describe("SheetsCopySheetData", () => {

  let fakeGetSheets = new FakeGetSheets();
  let fakeGetSheetData = new FakeGetSheetData();
  let sheetsCopySheetData = new SheetsCopySheetData(fakeGetSheets, fakeGetSheetData);

  test('.execute() with sheetData', () => {
    let sheetName = "sheetName";
    let result = sheetsCopySheetData.execute(sheetName);
    expect(result.result).toBe("sheetName");
    expect(result.success).toBe(true);
    expect(result.errors).toStrictEqual(["Data copied successfully"]);
  });

  test('.execute() without sheetData', () => {
    let sheetName = "invalidSheetName";
    let result = sheetsCopySheetData.execute(sheetName);
    expect(result.result).toBe("invalidSheetName");
    expect(result.success).toBe(false);
    expect(result.errors).toStrictEqual(["No data to copy"]);
  });
});