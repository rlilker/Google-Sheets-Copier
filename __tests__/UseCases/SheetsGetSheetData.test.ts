import { SheetsA1NotationResolver } from "../../src/A1Notation";
import { SheetsGetSheetData } from "../../src/UseCases"
import { ChildSheet, SheetData } from "../../src/Models"
import { FakeA1NotationValidator } from "../A1Notation/Fakes/FakeA1NotationValidator";

/* 
This uses the data returned from the Mock SpreadsheetApp data in setup-mock.js

This is to keep things relatively simple for now, there are some packages out there 
that might do the job (listed below) but they either appear incomplete or unmaintained.

https://github.com/dan-kushnaryov/gas-mock-globals
https://github.com/vlucas/gasmask
*/
describe("SheetsGetSheetData", () => {
  let fakeA1NotationValidator = new FakeA1NotationValidator(true, "");
  let a1NotationResolver = new SheetsA1NotationResolver(fakeA1NotationValidator);
  let sheetsGetSheetData = new SheetsGetSheetData(a1NotationResolver);
  let sheets: ChildSheet[] = [];
  sheets.push(new ChildSheet("sheetName","https://docs.google.com/spreadsheets/d/thisPartIsTheSheetId","A1:A1"));
  sheets.push(new ChildSheet("anotherSheetName","https://docs.google.com/spreadsheets/d/thisPartIsStillTheSheetId","A2:A2"));

  afterEach(() => {
    global.SpreadsheetApp = {
      openById: () => ({
        getSheetByName: () => ({
          // @ts-ignore
          getRange: () => ({
            getA1Notation: () => "A1:A3",
            getValues: () => [[123,456],[789,12],[345,678]]
          })
        })
      }),
      getActiveSpreadsheet: () => ({
        getActiveSheet: () => ({
          // @ts-ignore
          getActiveCell: () => ({
            //@ts-ignore
            getColumn: () => ({}),
            //@ts-ignore
            getRow: () => ({})
          }),
          getRange: () => ({
            //@ts-ignore
            setValues: () => ({})
          })
        })
      }),
    };
  });

  test('.execute() with valid sheetData', () => {
    let sheetData: SheetData = sheetsGetSheetData.execute(sheets);
    expect(sheetData.data.length).toBe(6);
  });

  test('.execute() with no sheet with that name throws error', () => {   
    global.SpreadsheetApp = {
      //@ts-ignore
      openById: () => ({
        getSheetByName: () => null
      })
    };
    expect(() => {
      sheetsGetSheetData.execute(sheets);
    }).toThrow(new Error(`Error getting child Sheet Data: No Sheet exists with the name sheetName`));
  });

  let testSheetUrls = [
    {sheetUrl: "https://docs.google.com/spreadsheets/d/thisPartIsTheSheetId", expected: "thisPartIsTheSheetId"},
    {sheetUrl: "https://docs.google.com/spreadsheets/d/thisPartIsTheSheetId/edit#gid=1829383143", expected: "thisPartIsTheSheetId"},
    {sheetUrl: "spreadsheets/d/thisPartIsTheSheetId/edit#gid=1829383143", expected: "thisPartIsTheSheetId"},
  ]

  test.each(testSheetUrls)('.getSheetId($sheetUrl)', ({sheetUrl, expected}) => {
    expect(sheetsGetSheetData.getSheetId(sheetUrl)).toBe(expected);
  });

  test('.getSheetId with bad sheet url', () => {
    expect(() => {
      sheetsGetSheetData.getSheetId("sheetUrl")
    }).toThrow();
  });
});