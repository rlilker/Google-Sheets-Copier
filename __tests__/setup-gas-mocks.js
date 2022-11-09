global.SpreadsheetApp = {
  openById: () => ({
    getSheetByName: () => ({
      getRange: () => ({
        getA1Notation: () => "A1:A3",
        getValues: () => [[123,456],[789,12],[345,678]]
      })
    })
  }),
  getActiveSpreadsheet: () => ({
    getActiveSheet: () => ({
      // @ts-ignore
      getActiveCell: () => ({
        getColumn: () => ({}),
        getRow: () => ({})
      }),
      getRange: () => ({
        setValues: () => ({})
      })
    }),
    getSheetByName: () => ({
      getRange: () => ({
        getA1Notation: () => "A1:A3",
        getValues: () => [[123,456],[789,12],[345,678]]
      }),
      getLastRow: () => mockConfigSheetValues.length,
      getSheetValues: (startRow, startColumn, numRows, numColumns) => getMockConfigSheetValues(startColumn, numRows)
    }),
    getSheets: () => spreadsheets
  })
};
let spreadsheets = [getSpreadsheet("Config"), getSpreadsheet("NotConfig")];
function getSpreadsheet(name) {
  return {
    getName: () => name
  };
};

global.mockConfigSheetValues = [];
global.setDefaultMockConfigSheetValues = function(){};
(setDefaultMockConfigSheetValues = function(){
  mockConfigSheetValues = [
    ['https://docs.google.com/spreadsheets/d/thisIsTheSheetId', 'ChildSheetName', 'A1:A1'],
    ['https://docs.google.com/spreadsheets/d/thisIsAnotherSheetId', 'ChildSheetName', 'A1:A1'],
    ['https://docs.google.com/spreadsheets/d/andAnotherSheetId', 'SecondChildSheetName', 'A1:A10'],
    ['https://docs.google.com/spreadsheets/d/yetAnotherSheetId', 'SecondChildSheetName', 'A1:A10'],
    ['https://docs.google.com/spreadsheets/d/thisIsAlsoAnotherSheetId', 'SecondChildSheetName', 'A1:A10']
  ];
})();
function getMockConfigSheetValues(startColumn, numRows) {
  let output = [];
  for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
    output.push([mockConfigSheetValues[rowIndex][startColumn-1]]);
  }
  return output;
}

global.CardService = {
  newCardBuilder: () => ({
    addSection: () => new CardSection(),
    build: () => ({})
  }),
  newCardSection: () => new CardSection(),
  newDecoratedText: () => ({
    setText: () => ({
      setWrapText: () => ({
        setTopLabel: () => ({}),
      }),
    }),
  }),
  newTextInput: () => ({
    setFieldName: () => ({
      setTitle: () => ({
        setValue: () => ({}),
      }),
    }),
  }),
  newButtonSet: () => ({
    addButton: () => ({}),
  }),
  newTextButton: () => ({
    setText: () => ({
      setTextButtonStyle: () => ({
        setOnClickAction: () => ({
          setDisabled: () => ({}),
        }),
      }),
    }),
  }),
  TextButtonStyle: {},
  newSelectionInput: () => ({
    setTitle: () => ({
      setFieldName: () => ({
        setType: () => ({
          addItem: () => ({}),
        }),
      }),
    }),
  }),
  SelectionInputType: {},
  newAction: () => ({
    setFunctionName: () => ({}),
  }),
  newNavigation: () => ({
    popCard: () => ({}),
  }),
  newActionResponseBuilder: () => ({
    setNavigation: () => ({
      build: () => ({}),
    }),
  }),
};
class CardSection {
  // @ts-ignore
  addWidget(widget) { 
    return this;
  }
}