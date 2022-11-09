import { ValidationResult } from "../../Models/ValidationResult";

export interface A1NotationValidator {
  validateRange(rangeA1: string): ValidationResult;
  validateCell(cellA1: string): ValidationResult;
  validateColumnRef(colA1: string): ValidationResult;
  validateRowRef(rowA1: number): ValidationResult;
}