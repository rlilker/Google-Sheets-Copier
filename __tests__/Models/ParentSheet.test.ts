import { ParentSheet, RangeIndex, RangeIndices, SheetData } from '../../src/Models';

describe("ParentSheet", () => {

  let parentSheet: ParentSheet;

  beforeAll(() => {
    return new Promise<void>(resolve => {
      parentSheet = ParentSheet.getInstance();
      resolve();
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('constructor', () => {
    let secondParentSheet = ParentSheet.getInstance();
    expect(parentSheet).toStrictEqual(secondParentSheet);
  });

  test('.spreadsheet()', () => {
    let functionSpy: jest.SpyInstance;
    functionSpy = jest.spyOn(SpreadsheetApp, 'getActiveSpreadsheet');
    
    parentSheet.spreadsheet();
    
    expect(functionSpy).toHaveBeenCalledTimes(1);
  });

  test('.activeSheet()', () => {
    let functionSpy: jest.SpyInstance;
    functionSpy = jest.spyOn(parentSheet, 'activeSheet');
    
    parentSheet.activeSheet();
    
    expect(functionSpy).toHaveBeenCalledTimes(1);
  });

  test('.activeCell()', () => {
    let functionSpy: jest.SpyInstance;
    functionSpy = jest.spyOn(parentSheet, 'activeCell');
    
    parentSheet.activeCell();

    expect(functionSpy).toHaveBeenCalledTimes(1);
  });

  test('.setRange()', () => {
    let activeCellSpy: jest.SpyInstance;
    let activeSheetSpy: jest.SpyInstance;
    let setRangeSpy: jest.SpyInstance;
    activeCellSpy = jest.spyOn(parentSheet, 'activeCell');
    activeSheetSpy = jest.spyOn(parentSheet, 'activeSheet');
    setRangeSpy = jest.spyOn(parentSheet, 'setRange');
    let rangeIndex = new RangeIndex(1,1);
    let data: any[][] = [];
    let sheetData = new SheetData("", "", new RangeIndices(rangeIndex,rangeIndex), data);
    parentSheet.setRange(sheetData);

    expect(activeCellSpy).toHaveBeenCalledTimes(1);
    expect(activeSheetSpy).toHaveBeenCalledTimes(2);
    expect(setRangeSpy).toHaveReturnedTimes(1);
  });
});