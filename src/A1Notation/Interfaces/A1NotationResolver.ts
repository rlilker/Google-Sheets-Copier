import { RangeIndices, RangeIndex } from "../../Models";

export interface A1NotationResolver {

  rangeA1ToIndices(rangeA1: string): RangeIndices;
  cellA1ToIndex(cellA1: string): RangeIndex;
  colA1ToIndex(colA1: string): number;
  rowA1ToIndex(rowA1: string): number;
}