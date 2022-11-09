import { Result } from "../../Models/Result";

export default interface CopySheetData {
  execute(sheetName: string): Result<string>;
}