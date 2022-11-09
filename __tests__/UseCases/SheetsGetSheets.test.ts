import { SheetsA1NotationResolver } from "../../src/A1Notation";
import { SheetsGetSheets } from "../../src/UseCases"
import { ChildSheet, Config } from "../../src/Models"
import { FakeA1NotationValidator } from "../A1Notation/Fakes/FakeA1NotationValidator";

describe("SheetsGetSheets", () => {

  afterEach(() => {
    global.setDefaultMockConfigSheetValues();
  });

  let fakeA1NotationValidator = new FakeA1NotationValidator(true, "");
  let a1NotationResolver = new SheetsA1NotationResolver(fakeA1NotationValidator);
  let sheetsGetSheets = new SheetsGetSheets(a1NotationResolver);
  
  let config = Config.getInstance();
  config.externalSheetUrlColumnRef = "A1";
  config.externalSheetNameColumnRef = "B1";
  config.externalSheetRangeColumnRef = "C1";

  test('.list() with a valid configuration returns the expected number of ChildSheets', () => {
    let list: ChildSheet[] = sheetsGetSheets.list();
    expect(list.length).toBe(5);
  });

  test('.list() with a valid configuration returns the expected ChildSheet values', () => {
    let list: ChildSheet[] = sheetsGetSheets.list();
    let childSheet = list[0];
    
    expect(childSheet.url).toBe('https://docs.google.com/spreadsheets/d/thisIsTheSheetId');
    expect(childSheet.name).toBe('ChildSheetName');
    expect(childSheet.range).toBe('A1:A1');
  });

  test('.list() with an invalid configuration returns an error', () => {
    global.mockConfigSheetValues = [
      ['https://docs.google.com/spreadsheets/d/thisIsTheSheetId', 'ChildSheetName', '']
    ];

    expect(() => {
      sheetsGetSheets.list();
    }).toThrow("Config data not correctly set up. The child Spreadsheet Url, it's Sheet name, and the Range to copy must all be provided on every row");
  });

  test('.externalSheetsByName() with a valid configuration returns the expected filtered ChildSheets', () => {
    let list: ChildSheet[] = sheetsGetSheets.externalSheetsByName('SecondChildSheetName');
    expect(list.length).toBe(3);
  });
});