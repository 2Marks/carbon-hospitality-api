module.exports = {
    testEnvironment: "node",
    verbose: true,
    testTimeout: 10000,
    roots: ["<rootDir>/src"],
    testMatch: ["**/?(*.)+(spec|test).ts"],
    transform: {
      "^.+\\.(ts|tsx)$": "ts-jest",
    },
    collectCoverageFrom: ["src/**/*.(ts)"],
  };
  