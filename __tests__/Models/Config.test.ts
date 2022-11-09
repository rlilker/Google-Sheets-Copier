import { Config } from '../../src/Models';

describe("Config", () => {
  test('default values', () => {
    let config = Config.getInstance();

    expect(config.selectedSourceIndex).toBe(0);
    expect(config.configSheetName).toBe("Config");
    expect(config.externalSheetUrlColumnRef).toBe("N3");
    expect(config.externalSheetNameColumnRef).toBe("O3");
    expect(config.externalSheetRangeColumnRef).toBe("P3");
  });
});