// Jest configuration
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^Types/(.*)$": "<rootDir>/src/types/$1",
    "^Utils/(.*)$": "<rootDir>/src/utils/$1",
    "^Services/(.*)$": "<rootDir>/src/services/$1",
    "^Models/(.*)$": "<rootDir>/src/models/$1",
    "^Constants/(.*)$": "<rootDir>/src/constants/$1",
    "^Routes/(.*)$": "<rootDir>/src/routes/$1",
  },
  modulePaths: ["<rootDir>"],
  coverageDirectory: "../coverage",
  moduleFileExtensions: ["js", "json", "ts"],
  testRegex: ".*\\.spec\\.ts$",
  transform: { "^.+\\.(t|j)s$": "ts-jest" },
  collectCoverageFrom: ["**/*.(t|j)s"],
};
