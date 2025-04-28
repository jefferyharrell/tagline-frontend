// jest.config.js
module.exports = {
  testPathIgnorePatterns: [
    "/node_modules/",
    "/tests/e2e/", // Ignore Playwright E2E tests
  ],
  // Add more Jest config here as needed
};
