import { SheetsConfigCard } from "../../src/Cards";
import { FakeA1NotationValidator } from "../A1Notation/Fakes/FakeA1NotationValidator";

/***
 * The GAS code in the class under test is mocked, and although it will say it's 100% covered, it's not.
 * Ideally it would be nice to have things under test such as whether the built card from createConfigCard matched what's expected, for example.
 * Only the functional code that's separate from the GAS globals are what's under test here.  
 */
describe("ConfigCard", () => {

  let sheetsConfigCard = new SheetsConfigCard(new FakeA1NotationValidator(true, ""));

  test('.createConfigCard()', () => {

    expect(() => {
      sheetsConfigCard.createConfigCard()
    }).not.toThrow();
    
  });

  test('.saveConfig()', () => {

    var form = {
      formInput: {
        configSheet: "Config",
        documentsColumn: "A1",
        sheetsColumn: "A2",
        rangesColumn: "A3",
      }
    }

    expect(() => {
      sheetsConfigCard.saveConfig(form)
    }).not.toThrow();
    
  });

  test('.saveConfig() with invalid data', () => {

    let dummyValidationMessage = "Didn't work";
    let invalidSheetsConfigCard = new SheetsConfigCard(new FakeA1NotationValidator(false, dummyValidationMessage));
    var form = {
      formInput: {
        configSheet: "Config",
        documentsColumn: "A1",
        sheetsColumn: "A2",
        rangesColumn: "A3",
      }
    }

    let errorMessage = "There are some issues with the settings entered:\n\n";
    errorMessage += `${dummyValidationMessage} for Document Url Column\n\n`;
    errorMessage += `${dummyValidationMessage} for Sheet Column\n\n`;
    errorMessage += `${dummyValidationMessage} for Range Column\n\n`;

    expect(() => {
      invalidSheetsConfigCard.saveConfig(form)
    }).toThrow(errorMessage);
    
  });
});