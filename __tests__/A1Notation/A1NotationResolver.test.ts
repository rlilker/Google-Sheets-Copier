import { FakeA1NotationValidator } from './Fakes/FakeA1NotationValidator';
import { SheetsA1NotationResolver } from "../../src/A1Notation";
import { RangeIndex, RangeIndices, ValidationResult } from '../../src/Models';

describe("A1NotationResolver", () => {

  let sheetsA1NotationResolver = new SheetsA1NotationResolver(new FakeA1NotationValidator(true, ""));
  let testErrorMessage = "Test error message"
  let unsuccessfulA1NotationResolver = new SheetsA1NotationResolver(new FakeA1NotationValidator(false, testErrorMessage));

  const testRangeDataTable = makeValidRangeTestData();
  const testCellDataTable = makeValidCellTestData();
  const testColumnDataTable = makeValidColumnTestData();
  const testRowDataTable = makeValidRowTestData();

  test.each(testRangeDataTable)('.rangeA1ToIndices($range)', ({range, expected}) => {
    expect(sheetsA1NotationResolver.rangeA1ToIndices(range)).toMatchObject(expected);
  });

  test('.rangeA1ToIndices failure', () => {
    expect(() => {
      unsuccessfulA1NotationResolver.rangeA1ToIndices("A1:A1");
    }).toThrow(testErrorMessage);
  });

  test.each(testCellDataTable)('.cellA1ToIndex($cellRef)', ({cellRef, expected}) => {
    expect(sheetsA1NotationResolver.cellA1ToIndex(cellRef)).toMatchObject(expected);
  });

  test('.cellA1ToIndex failure', () => {
    expect(() => {
      unsuccessfulA1NotationResolver.cellA1ToIndex("A1");
    }).toThrow(testErrorMessage);
  }); 

  test.each(testColumnDataTable)('.colA1ToIndex($colRef)', ({colRef, expected}) => {
    expect(sheetsA1NotationResolver.colA1ToIndex(colRef)).toBe(expected);
  });

  test('.colA1ToIndex failure', () => {
    expect(() => {
      unsuccessfulA1NotationResolver.colA1ToIndex("A");
    }).toThrow(testErrorMessage);
  });

  test.each(testRowDataTable)('.rowA1ToIndex($rowRef)', ({rowRef, expected}) => {
    expect(sheetsA1NotationResolver.rowA1ToIndex(rowRef)).toBe(expected);
  });

  test('.rowA1ToIndex failure', () => {
    expect(() => {
      unsuccessfulA1NotationResolver.rowA1ToIndex("1");
    }).toThrow(testErrorMessage);
  });
});

function makeValidRangeTestData() {
  //Setup valid cell refs
  let testData = [
    {range: "A1:A1", expected: new RangeIndices(new RangeIndex(1,1), new RangeIndex(1,1))},
    {range: "A1:Z999", expected: new RangeIndices(new RangeIndex(1,1), new RangeIndex(999,26))},
    {range: "Z10:A1", expected: new RangeIndices(new RangeIndex(10,26), new RangeIndex(1, 1))},
    {range: "AAA1:ZZZ999999", expected: new RangeIndices(new RangeIndex(1,703), new RangeIndex(999999,18278))},
  ];
  return testData;
}

function makeValidCellTestData() {
  //Setup valid cell refs
  let testData = [
    {cellRef: "A1", expected: new RangeIndex(1,1)},
    {cellRef: "Z30000", expected: new RangeIndex(30000, 26)},
    {cellRef: "AZ27", expected: new RangeIndex(27, 52)},
    {cellRef: "ZZZ999999", expected: new RangeIndex(999999, 18278)},
  ];
  return testData;
}

function makeValidColumnTestData() {
  //Setup valid cell refs
  let testData = [
    {colRef: "A", expected: 1},
    {colRef: "Z", expected: 26},
    {colRef: "AZ", expected: 52},
    {colRef: "ZZZ", expected: 18278},
  ];
  return testData;
}

function makeValidRowTestData() {
  //Setup valid cell refs
  let testData = [
    {rowRef: "1", expected: 1},
    {rowRef: "2345", expected: 2345},
    {rowRef: "9999999", expected: 9999999},
  ];
  return testData;
}