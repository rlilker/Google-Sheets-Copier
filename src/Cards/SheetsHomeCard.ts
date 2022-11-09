
import { injectable, inject } from "inversify";
import SERVICE_IDENTIFIER from "../IoC/identifiers";
import "reflect-metadata";
import type { GetSheets } from "../UseCases/Interfaces";
import { Config } from "../Models"
import { HomeCard } from "./Interfaces";

@injectable()
export class SheetsHomeCard implements HomeCard {

  private readonly getSheets: GetSheets;
  private readonly config: Config;

  constructor(@inject(SERVICE_IDENTIFIER.GETSHEETS) getSheets: GetSheets) {
    this.getSheets = getSheets;
    this.config = Config.getInstance();
  }

  /**
   * Main function to generate the main card.
   * @return {CardService.Card} The card to show to the user.
   */
  createSelectionCard() {

    var builder = CardService.newCardBuilder();

    var instructionsSection = CardService.newCardSection()
      .addWidget(CardService.newDecoratedText()
        .setText("In order to copy sheets from other Google Sheets, a Sheet must be added in the main parent Spreadsheet with the name 'Config'. \n\nThis sheet must contain the columns 'Documents', 'Sheets', and 'Sheet Ranges' which must be at the positions set using the Configure option below.  \n\nDocuments must be the link to the child spreadsheet, Sheets must contain a Sheet with the exact name, and Ranges must be a valid range within the afforementioned sheet.")
        .setWrapText(true)
        .setTopLabel("Instructions for Use")) 
      .addWidget(CardService.newTextButton()
        .setText("Configure")
        .setTextButtonStyle(CardService.TextButtonStyle.TEXT)
        .setOnClickAction(CardService.newAction().setFunctionName('openConfigCard'))
      );

    builder.addSection(instructionsSection);

    // "Source" selection to determine what child sheet(s) to copy from
    var sourceSection = CardService.newCardSection()
      .addWidget(this.generateSourceDropdown('source', 'Copy from: '));
    builder.addSection(sourceSection);

    //Buttons section
    builder.addSection(CardService.newCardSection()
      .addWidget(CardService.newButtonSet()
        .addButton(CardService.newTextButton()
          .setText('Copy')
          .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
          .setOnClickAction(CardService.newAction().setFunctionName('updateSheet'))
          .setDisabled(false)
        )
      )
    );

    return builder.build();
  }

  /**
   * Helper function to generate the drop down for the source sheets listed in the Config.
   * @param {String} fieldName
   * @param {String} fieldTitle
   * @return {CardService.SelectionInput} The card to show to the user.
   */
  private generateSourceDropdown(fieldName: string, fieldTitle: string) {
    var selectionInput = CardService.newSelectionInput()
      .setTitle(fieldTitle)
      .setFieldName(fieldName)
      .setType(CardService.SelectionInputType.DROPDOWN);

    var availableSources: string[] = this.getSheets.list()
    .map(x => x.name)
    .reduce(function(result: string[], option: string) {
      return result.includes(option) ? result : [...result, option];
    }, []);

    availableSources.forEach((source: string, index: number) => {
      selectionInput.addItem(source, source, this.config.selectedSourceIndex == index);
    })

    return selectionInput;
  }
}