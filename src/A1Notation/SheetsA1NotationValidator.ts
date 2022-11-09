import { injectable } from "inversify";
import "reflect-metadata";
import { ValidationResult } from "../Models/ValidationResult"
import { A1NotationValidator } from "./Interfaces"

@injectable()
export class SheetsA1NotationValidator implements A1NotationValidator {

  public validateRange(rangeA1: string) {
    let message: string | undefined;
    let isValid: boolean = false;
    if (rangeA1) {
      isValid = rangeA1.split(':').length === 2;
    }
    if (!isValid) {
      message = `Invalid range entered: ${rangeA1}`;
    }
    return new ValidationResult(isValid, message);
  }

  public validateCell(cellA1: string) {
    let message: string | undefined;
    let isValid = false;
    if (cellA1) {
      isValid = !!cellA1.match(/^\$?([A-Z]+)\$?(\d+)$/);
    }
    if (!isValid) {
      message = `Invalid cell reference: ${cellA1}`;
    }
    return new ValidationResult(isValid, message);
  }

  public validateColumnRef(colA1: string) {
    let message: string | undefined;
    let isValid = false;
    if (colA1) {
      isValid = /^[A-Z]+$/.test(colA1);
    }
    if(!isValid) {
      message = `Invalid column reference: ${colA1}`;
    }
    return new ValidationResult(isValid, message);
  }

  public validateRowRef(rowA1: number) {
    let message: string | undefined;
    let isValid: boolean = !!rowA1 && !isNaN(rowA1) && rowA1 > 0; //!! is needed to convert the truthy value into a bool
    if(!isValid) {
      message = `Invalid row number: ${rowA1}`;
    }
    return new ValidationResult(isValid, message);
  }
}