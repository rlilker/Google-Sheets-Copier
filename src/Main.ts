import { HomeCard, ConfigCard } from "./Cards/Interfaces";
import { CopySheetData } from "./UseCases/Interfaces";
import container from "./IoC/ioc_config";
import SERVICE_IDENTIFIER from "./IoC/identifiers";

let homeCard = container.get<HomeCard>(SERVICE_IDENTIFIER.HOMECARD);
let configCard = container.get<ConfigCard>(SERVICE_IDENTIFIER.CONFIGCARD);
let copySheetData = container.get<CopySheetData>(SERVICE_IDENTIFIER.COPYSHEETDATA);

/**
 * Callback for rendering the main card.
 * @return {CardService.Card} The card to show the user.
 */
function onHomepage(e: any) {
  return homeCard.createSelectionCard();
}

function openConfigCard(e: any) {
  return CardService.newActionResponseBuilder()
      .setNavigation(CardService.newNavigation()
        .pushCard(configCard.createConfigCard(e)))
      .setStateChanged(true)
      .build();
}

function updateSheet(e: any) {
  let result = copySheetData.execute(e.formInput.source);
}