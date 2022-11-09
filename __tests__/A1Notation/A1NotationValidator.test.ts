import { ValidationResult } from '../../src/Models';
import { SheetsA1NotationValidator } from "../../src/A1Notation";

describe("A1NotationValidator", () => {

  let emptyMessage: any;
  const successResult = new ValidationResult(true, emptyMessage);
  const sheetsA1NotationValidator = new SheetsA1NotationValidator();
  const testRangeDataTable = makeValidateRangeTestData(successResult);
  const testCellDataTable = makeValidateCellTestData(successResult);
  const testColumnDataTable = makeValidateColumnTestData(successResult);
  const testRowDataTable = makeValidateRowTestData(successResult);

  test.each(testRangeDataTable)('.validateRange($range)', ({range, expected}) => {
    expect(sheetsA1NotationValidator.validateRange(range)).toMatchObject(expected);
  });

  test.each(testCellDataTable)('.validateCell($cellRef)', ({cellRef, expected}) => {
    expect(sheetsA1NotationValidator.validateCell(cellRef)).toMatchObject(expected);
  });

  test.each(testColumnDataTable)('.validateColumnRef($colRef)', ({colRef, expected}) => {
    expect(sheetsA1NotationValidator.validateColumnRef(colRef)).toMatchObject(expected);
  });

  test.each(testRowDataTable)('.validateRowRef($rowRef)', ({rowRef, expected}) => {
    expect(sheetsA1NotationValidator.validateRowRef(rowRef)).toMatchObject(expected);
  });
});

function makeValidateRangeTestData(successResult: ValidationResult) {
  //Setup valid cell refs
  let testData = [
    {range: "A1:A1", expected: successResult},
    {range: "A1:Z999", expected: successResult},
    {range: "Z10:A1", expected: successResult},
    {range: "AAA1:ZZZ999999", expected: successResult},
  ];

  //Setup invalid cell refs
  ["A","1","A1::Z1"].forEach(range => {
    testData.push({range: range, expected: new ValidationResult(false, `Invalid range entered: ${range}`)})
  });
  return testData;
}

function makeValidateCellTestData(successResult: ValidationResult) {
  //Setup valid cell refs
  let testData = [
    {cellRef: "A1", expected: successResult},
    {cellRef: "Z30000", expected: successResult},
    {cellRef: "AZ27", expected: successResult},
    {cellRef: "ZZZ999999", expected: successResult},
  ];

  //Setup invalid cell refs
  ["A","1","A1A","1A","ZZ",",1","ø1"].forEach(cellA1 => {
    testData.push({cellRef: cellA1, expected: new ValidationResult(false, `Invalid cell reference: ${cellA1}`)})
  });
  return testData;
}

function makeValidateColumnTestData(successResult: ValidationResult) {
  //Setup valid cell refs
  let testData = [
    {colRef: "A", expected: successResult},
    {colRef: "Z", expected: successResult},
    {colRef: "AZ", expected: successResult},
    {colRef: "ZZZ", expected: successResult},
  ];

  //Setup invalid cell refs
  ["1","A1","A1A","1A","ø1",""].forEach(colRef => {
    testData.push({colRef: colRef, expected: new ValidationResult(false, `Invalid column reference: ${colRef}`)})
  });
  return testData;
}

function makeValidateRowTestData(successResult: ValidationResult) {
  //Setup valid cell refs
  let testData = [
    {rowRef: 1, expected: successResult},
    {rowRef: 2345, expected: successResult},
    {rowRef: 9999999, expected: successResult},
  ];

  //Setup invalid cell refs
  [0,-1,-999999].forEach(rowRef => {
    testData.push({rowRef: rowRef, expected: new ValidationResult(false, `Invalid row number: ${rowRef}`)})
  });
  return testData;
}