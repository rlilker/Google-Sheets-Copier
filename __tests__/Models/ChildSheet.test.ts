import { ChildSheet } from '../../src/Models';

describe("ChildSheet", () => {
  test('constructor', () => {
    let childSheet = new ChildSheet("1","2","3");
    expect(childSheet.name).toBe("1");
    expect(childSheet.url).toBe("2");
    expect(childSheet.range).toBe("3");
  });
});