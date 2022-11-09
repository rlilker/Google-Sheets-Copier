export interface ConfigCard {

  /**
   * Create and return the main card for display in the Add Ons panel.
   * @return {CardService.Card} The card to show the user.
   */
   createConfigCard(e: any): any;

  /**
   * Save the config and navigate back to the Home Card
   * @return {CardService.Card} The card to show the user.
   */
   saveConfig(e: any): any;
}