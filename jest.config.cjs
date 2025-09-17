module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.spec.json'
    }
  },
  moduleNameMapper: {
  '^@angular/core$': '<rootDir>/src/test-mocks/angular-core-mock.js',
  '^@angular/common$': '<rootDir>/src/test-mocks/angular-common-mock.js',
  '^@angular/forms$': '<rootDir>/src/test-mocks/angular-forms-mock.js'
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  testMatch: ['**/?(*.)+(spec|test).ts'],
};
