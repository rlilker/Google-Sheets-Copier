import { SheetData, RangeIndex, RangeIndices } from '../../src/Models';

describe("SheetData", () => {

  let sheetData: SheetData;

  beforeAll(() => {
    return new Promise<void>(resolve => {
      let rangeIndex = new RangeIndex(1,1);
      let data: any[][] = [['This is some test data']];
      sheetData = new SheetData("test", "A1:A1", new RangeIndices(rangeIndex,rangeIndex), data);
      resolve();
    });
  });

  test('.append()', () => {
    let moredata: any[][] = [['This is some more test data']];
    let expected: any[][] = [['This is some test data'],['This is some more test data']];
    sheetData.append(moredata);

    expect(sheetData.data).toEqual(
      expect.arrayContaining(expected),
    );
  });
});