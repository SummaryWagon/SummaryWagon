// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
import { server } from "./src/mocks/server";

const fetchPolifill = require("whatwg-fetch");

global.fetch = fetchPolifill.fetch;
beforeAll(() => {
  console.log("listening...");
  server.listen();
});

afterAll(() => {
  server.close();
});

afterEach(() => {
  server.resetHandlers();
});