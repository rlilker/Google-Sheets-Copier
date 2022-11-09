import { injectable, inject } from "inversify";
import SERVICE_IDENTIFIER from "../IoC/identifiers";
import "reflect-metadata";
import type { A1NotationValidator } from "../A1Notation/Interfaces";
import { Config, ParentSheet, ValidationResult } from "../Models"
import { ConfigCard } from "./Interfaces";

@injectable()
export class SheetsConfigCard implements ConfigCard {

  private readonly a1NotationValidator: A1NotationValidator;
  private readonly config: Config;
  private readonly parentSheet: ParentSheet;

  constructor(@inject(SERVICE_IDENTIFIER.A1NOTATIONVALIDATOR) a1NotationValidator: A1NotationValidator) {
    this.a1NotationValidator = a1NotationValidator;
    this.config = Config.getInstance();
    this.parentSheet = ParentSheet.getInstance();
  }

  /**
   * Main function to generate the main card.
   * @return {CardService.Card} The card to show to the user.
   */
  createConfigCard() {
    var builder = CardService.newCardBuilder();

    var instructionsSection = CardService.newCardSection()
      .addWidget(CardService.newDecoratedText()
        .setText("A sheet must exist in the parent spreadsheet that contains three columns, one containing a Url to the child worksheet, one containing the sheet name from which to copy the data from, and one containing the range in A1 notation (e.g. B2:R33)")
        .setWrapText(true)
        .setTopLabel("Instructions for Use")); 
    builder.addSection(instructionsSection);

    // Config sheet selection
    var sourceSection = CardService.newCardSection()
      .addWidget(this.generateConfigSheetDropdown('configSheet', 'Config Sheet: '));
    builder.addSection(sourceSection);

    //Columns section
    builder.addSection(CardService.newCardSection()
      .addWidget(CardService.newTextInput()
        .setFieldName('documentsColumn')
        .setTitle('Enter Column Ref for child document Urls (e.g. A2)')
        .setValue(this.config.externalSheetUrlColumnRef))
      .addWidget(CardService.newTextInput()
        .setFieldName('sheetsColumn')
        .setTitle('Enter Column Ref for child document Sheet names (e.g. B2)')
        .setValue(this.config.externalSheetNameColumnRef))
      .addWidget(CardService.newTextInput()
        .setFieldName('rangesColumn')
        .setTitle('Enter Column Ref for child document Sheet Range (e.g. C2)')
        .setValue(this.config.externalSheetRangeColumnRef))
    );

    //Update button
    builder.addSection(CardService.newCardSection()
      .addWidget(CardService.newButtonSet()
        .addButton(CardService.newTextButton()
          .setText('Save')
          .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
          .setOnClickAction(CardService.newAction().setFunctionName('updateConfig'))
          .setDisabled(false))));

    return builder.build();
  }


  saveConfig(e: any) {
    var configSheet = e.formInput.configSheet;
    var validationResult = this.validateConfig(e);
    if (validationResult.isValid) {
      this.config.configSheetName = configSheet;
      this.config.externalSheetUrlColumnRef = e.formInput.documentsColumn;
      this.config.externalSheetNameColumnRef = e.formInput.sheetsColumn;
      this.config.externalSheetRangeColumnRef = e.formInput.rangesColumn;

      var nav = CardService.newNavigation().popCard();
      return CardService.newActionResponseBuilder()
          .setNavigation(nav)
          .build();
    } else {
      throw new Error(validationResult.message);
    }
  }

  /**
   * Helper function to generate the drop down for the source sheets listed in the Config.
   * @param {String} fieldName
   * @param {String} fieldTitle
   * @return {CardService.SelectionInput} The card to show to the user.
   */
  private generateConfigSheetDropdown(fieldName: string, fieldTitle: string) {
    var selectionInput = CardService.newSelectionInput().setTitle(fieldTitle)
      .setFieldName(fieldName)
      .setType(CardService.SelectionInputType.DROPDOWN);

    var availableSheets = this.parentSheet.sheetNames();

    availableSheets.forEach((sheetName, index, array) => {
      selectionInput.addItem(sheetName, sheetName, this.config.configSheetName == sheetName);
    });

    return selectionInput;
  }

  private validateConfig(e: any) {
    var fieldMessages: string[] = [];
    var message = "";
    var documentsResult = this.validateColumnRefField(e.formInput.documentsColumn, "Document Url Column", fieldMessages);
    var sheetsResult = this.validateColumnRefField(e.formInput.sheetsColumn, "Sheet Column", fieldMessages);
    var rangesResult = this.validateColumnRefField(e.formInput.rangesColumn, "Range Column", fieldMessages);

    var isValid = documentsResult.isValid && sheetsResult.isValid && rangesResult.isValid;

    if (!isValid) {
      var message = "There are some issues with the settings entered:\n\n";
      for(let i=0; i < fieldMessages.length; i++) {
        message += `${fieldMessages[i]}\n\n`;
      }
    }

    return new ValidationResult(isValid, message);
  }

  private validateColumnRefField(field: string, fieldname: string, messages: string[]) {
    var validationResult = this.a1NotationValidator.validateColumnRef(field);
    if (!validationResult.isValid) {
      messages.push(`${validationResult.message} for ${fieldname}`);
    }
    return validationResult;
  }
}