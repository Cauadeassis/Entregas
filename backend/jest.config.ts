import type { Config } from 'jest';

const config: Config = {
    setupFiles: ["<rootDir>/jest.setup.ts"],
    bail: true,
    clearMocks: true,
    coverageProvider: "v8",
    extensionsToTreatAsEsm: [".ts"],
    transform: {
        "^.+\\.tsx?$": ["ts-jest", {
            useESM: true,
        }]
    },
    preset: "ts-jest",
    testMatch: ["<rootDir>/src/**/*.test.ts"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1"
    }
};

export default config;
