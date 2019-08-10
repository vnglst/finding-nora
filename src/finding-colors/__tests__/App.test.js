import "@testing-library/jest-dom/extend-expect";
import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  waitForElement
} from "@testing-library/react";
import { mockMathRandom } from "../../shared/test-utils/mockMathRandom";
import App from "../App";

mockMathRandom();

let question;
let getByTestId;
let getAllByTestId;
let utils;

beforeEach(() => {
  utils = render(<App />);
  getByTestId = utils.getByTestId;
  getAllByTestId = utils.getAllByTestId;
  question = getByTestId("question");
});

afterEach(() => {
  cleanup();
});

it("should render App with question WHITE", () => {
  expect(question.textContent).toContain("WHITE");
});

it("should show you won when pressing correct color", async () => {
  const button = getAllByTestId(`button-purple`)[0];
  expect(button).toBeInTheDocument();
  fireEvent.mouseDown(button);
  await waitForElement(() => getByTestId("youwon"));
  const youWon = getByTestId("youwon");
  expect(youWon).toBeInTheDocument();
});
