# README #

A tool for copying data from multiple "child" Google sheets into a single "parent" Google sheet.

Sheet data from all children must have the same Sheet name and number of columns in the Range selected in order to be copied.

The default configuration is that the Spreadsheet Urls, Sheet names, and data Ranges belong in a Sheet within the "parent" Spreadsheet called "Config". This can be changed however by clicking on the Configure link.

### Prerequisites and set up

For local development you will need to install:

- [Node Js] + NPM (https://nodejs.org/en/download/)
- Autocomplete for Google Apps Script
  - `npm install --save @types/google-apps-script`
- [clasp](https://developers.google.com/apps-script/guides/clasp)

You will also need to enable the Google Apps Script API because that’s what clasp uses in the background. Navigate to the [Apps Script Settings page](https://script.google.com/home/usersettings), click on "Google Apps Script API" and toggle the switch to "on".

### Dependencies

Dependencies used in this project are:

[TypeScript](https://www.typescriptlang.org/) - For Strongly Typed code
[Jest](https://jestjs.io/) - for Unit Testing
[InfersifyJS](https://https://inversify.io/) - For Dependency Injection and Inversion of Control
[Rollup.js](https://rollupjs.org) - Module bundler to enable import/export of Typescript Modules
[Babel](https://babeljs.io/) - Used by Rollup for the transpilation of Typescript into vanilla JS

### How to run tests

Google Sheets Copier uses Jest for unit testing.

In VS Code, there is an included launch.json to enable running and debugging the tests using the Run and Debug tool. To run the tests in your CLI run `npm test` in the root directory, or `npm test:coverage` to output the Unit Test Coverage for the project.

