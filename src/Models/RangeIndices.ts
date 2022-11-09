import { RangeIndex } from "./RangeIndex";

export class RangeIndices {

  readonly start: RangeIndex;
  readonly end: RangeIndex;

  constructor(start: RangeIndex, end: RangeIndex) {
      this.start = start;
      this.end = end;
  }
}