/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  roots: ["<rootDir>/src/", "<rootDir>/tests/"],
  coverageReporters: ["text", "html"],
  collectCoverageFrom: ["src/**/*.{js,ts}"]
};
