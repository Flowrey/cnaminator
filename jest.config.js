/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  roots: ["<rootDir>/src/", "<rootDir>/tests/"],
  coverageReporters: ["text", "html"],
  collectCoverageFrom: ["src/**/*.{js,ts}"],
  moduleDirectories: ["node_modules", "src/js"],
  moduleNameMapper: {
    "^webextension-polyfill$": "<rootDir>/tests/__mocks__/browser.ts",
  },
  silent: true,
};
