import { RangeIndices } from "./RangeIndices";

export class SheetData {

  readonly name: string;
  readonly range: string;
  readonly rangeAsIndices: RangeIndices;
  data: any[][];

  constructor(name: string, range: string, rangeAsIndices: RangeIndices, data: any[][]) {
    this.name = name;
    this.range = range;
    this.rangeAsIndices = rangeAsIndices;
    this.data = data;
  }

  append(data: any[][]) {
    this.data = this.data.concat(data);
  }

  rows(): number {
    return this.data.length;
  }

  columns(): number {
    return this.rangeAsIndices.end.col - this.rangeAsIndices.start.col + 1;
  }
}