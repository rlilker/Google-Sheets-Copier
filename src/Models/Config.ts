export class Config {
  private static instance: Config;

  selectedSourceIndex: number;
  configSheetName: string;
  externalSheetUrlColumnRef: string;
  externalSheetNameColumnRef: string;
  externalSheetRangeColumnRef: string;
  
  private constructor() { 
    //set default values
    this.selectedSourceIndex = 0;
    this.configSheetName = "Config";
    this.externalSheetUrlColumnRef = "N3";
    this.externalSheetNameColumnRef = "O3";
    this.externalSheetRangeColumnRef = "P3";

  }
  public static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }
}