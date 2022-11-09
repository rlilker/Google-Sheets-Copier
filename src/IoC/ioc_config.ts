import "reflect-metadata";

import { Container } from "inversify";

import {
  A1NotationValidator,
  A1NotationResolver
} from "../A1Notation/Interfaces";
import { 
  GetSheets,
  GetSheetData,
  CopySheetData 
} from "../UseCases/Interfaces";
import {
  HomeCard,
  ConfigCard
} from "../Cards/Interfaces";

import SERVICE_IDENTIFIER from "./identifiers";

import { 
  SheetsA1NotationValidator, 
  SheetsA1NotationResolver 
} from "../A1Notation";
import { 
  SheetsHomeCard, 
  SheetsConfigCard
} from "../Cards";
import { 
  SheetsGetSheets,
  SheetsGetSheetData,
  SheetsCopySheetData 
} from "../UseCases";

let container = new Container();

container.bind<A1NotationValidator>(SERVICE_IDENTIFIER.A1NOTATIONVALIDATOR).to(SheetsA1NotationValidator);
container.bind<A1NotationResolver>(SERVICE_IDENTIFIER.A1NOTATIONRESOLVER).to(SheetsA1NotationResolver);
container.bind<GetSheets>(SERVICE_IDENTIFIER.GETSHEETS).to(SheetsGetSheets);
container.bind<GetSheetData>(SERVICE_IDENTIFIER.GETSHEETDATA).to(SheetsGetSheetData);
container.bind<CopySheetData>(SERVICE_IDENTIFIER.COPYSHEETDATA).to(SheetsCopySheetData);
container.bind<HomeCard>(SERVICE_IDENTIFIER.HOMECARD).to(SheetsHomeCard);
container.bind<ConfigCard>(SERVICE_IDENTIFIER.CONFIGCARD).to(SheetsConfigCard);

export default container;