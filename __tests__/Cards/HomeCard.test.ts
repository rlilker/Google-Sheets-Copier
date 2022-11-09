import { SheetsHomeCard } from "../../src/Cards";
import { FakeGetSheets } from "../UseCases/Fakes";

describe("HomeCard", () => {

  let sheetsHomeCard = new SheetsHomeCard(new FakeGetSheets());

  test('.onHomepage()', () => {


    expect(() => {
      sheetsHomeCard.createSelectionCard()
    }).not.toThrow();
    
  });
});