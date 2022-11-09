import { A1NotationValidator } from "../../../src/A1Notation/Interfaces";
import { ValidationResult } from "../../../src/Models";

export class FakeA1NotationValidator implements A1NotationValidator {

  private _successResult: ValidationResult;
  constructor(isValid: boolean, message: string) {
    this._successResult = new ValidationResult(isValid, message);
  }

  validateRange(rangeA1: string): ValidationResult{
    return this._successResult;
  }
  validateCell(cellA1: string): ValidationResult{
    return this._successResult;
  }
  validateColumnRef(colA1: string): ValidationResult{
    return this._successResult;
  }
  validateRowRef(rowA1: number): ValidationResult{
    return this._successResult;
  }
}