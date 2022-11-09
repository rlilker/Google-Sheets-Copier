/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.m?[tj]sx?$': 'ts-jest'
  },
  testMatch: [
      "**/__tests__/**/*.test.(ts|js)"
  ],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  setupFiles: ['<rootDir>/__tests__/setup-gas-globals.ts', '<rootDir>/__tests__/setup-gas-mocks.js'],
  collectCoverageFrom: ["src/**/*.{ts,js}", "!**/node_modules/**"]
};