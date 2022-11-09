import { injectable, inject } from "inversify";
import SERVICE_IDENTIFIER from "../IoC/identifiers";
import "reflect-metadata";
import { RangeIndices, RangeIndex } from "../Models";
import type { A1NotationValidator } from "./Interfaces"

@injectable()
export class SheetsA1NotationResolver {

  readonly validator: A1NotationValidator;

  constructor(@inject(SERVICE_IDENTIFIER.A1NOTATIONVALIDATOR) validator: A1NotationValidator) {
    this.validator = validator;
  }

  rangeA1ToIndices(rangeA1: string): RangeIndices {
    let validationResult = this.validator.validateRange(rangeA1);
    if (validationResult.isValid) {

      let splitRange: string[] = rangeA1.split(':');
      let startRange = this.cellA1ToIndex(splitRange[0]);
      let endRange = this.cellA1ToIndex(splitRange[1]);

      let startIndex = new RangeIndex(startRange.row, startRange.col);
      let endIndex = new RangeIndex(endRange.row, endRange.col);

      return new RangeIndices(startIndex, endIndex);
    } else {
      throw new Error(validationResult.message);
    }
  }

  /**
   * Convert a cell reference from A1Notation to a 1-based index.
   *
   * @param {String}    cellA1   Cell reference to be converted.=
   *
   * @return {object}            {row,col}, both 1-based array indices. (Sorry)
   *
   * @throws                     Error if invalid parameter
   */
  cellA1ToIndex(cellA1: string): RangeIndex {
    var validationResult = this.validator.validateCell(cellA1);
    if (validationResult.isValid) {
      
      var match = cellA1.match(/^\$?([A-Z]+)\$?(\d+)$/);
      if (match !== null) {
        var colA1 = match[1];
        var rowA1 = match[2];
        return new RangeIndex(this.rowA1ToIndex(rowA1), this.colA1ToIndex(colA1));
      } else {
        throw new Error("Here be dragons, the validator should catch non-matching cell references!");
      }
    } else {
      throw new Error(validationResult.message);
    }
  }

  /**
   * Return a 1-based array index corresponding to a spreadsheet column
   * label, as in A1 notation.
   *
   * @param {String}    colA1    Column label to be converted.
   *
   * @return {Number}            1-based array index. (So sorry)
   *
   * @throws                     Error if invalid parameter
   */
  colA1ToIndex(colA1: string): number {
    var validationResult = this.validator.validateColumnRef(colA1);
    if (validationResult.isValid) {
      var i, l, chr,
        sum = 0,
        A = "A".charCodeAt(0),
        radix = "Z".charCodeAt(0) - A + 1;

      for(i = 0, l = colA1.length ; i < l ; i++) {
        chr = colA1.charCodeAt(i);
        sum = sum * radix + chr - A + 1
      }

      return sum;
    } else {
      throw new Error(validationResult.message);
    }
  }

  rowA1ToIndex(rowA1: string): number {
    var index = parseInt(rowA1, 10);
    var validationResult = this.validator.validateRowRef(index);
    if (validationResult.isValid) {
      return index;
    } else {
      throw new Error(validationResult.message);
    }
  }
}