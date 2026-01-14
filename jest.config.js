module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    roots: ["<rootDir>/test"],
    testMatch: ["**/*.test.ts", "**/*.test.js"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
    collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts"],
    transform: {
        "^.+\\.ts$": "ts-jest",
    },
};
