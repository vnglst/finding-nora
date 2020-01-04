import "@testing-library/jest-dom/extend-expect";
import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  waitForElement
} from "@testing-library/react";
import reducers from "../redux/reducers";
import { Provider } from "react-redux";
import { createStore } from "redux";
import App from "../AppContainer";
import { mockMathRandom } from "../test-utils/mockMathRandom";

mockMathRandom();

afterEach(() => {
  cleanup();
});

function renderWithRedux(
  ui,
  { initialState, store = createStore(reducers, initialState) } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store
  };
}

it.skip("should show NORA", async () => {
  const { getByRole, getByText, queryByText, debug } = renderWithRedux(<App />);
  const heading = getByRole("heading");
  expect(heading).toHaveTextContent("NORA");

  const N = getByText("N");
  const O = getByText("O");
  const R = getByText("R");
  const A = getByText("A");

  expect(N).toBeInTheDocument();
  expect(O).toBeInTheDocument();
  expect(R).toBeInTheDocument();
  expect(A).toBeInTheDocument();
});

it("should render About page when info icon is clicked", async () => {
  const { getByLabelText, getByText, queryByText } = renderWithRedux(<App />);

  const infoButton = getByLabelText("About this app");

  fireEvent.mouseDown(infoButton);

  expect(getByText(/Koen van Gilst/)).toBeInTheDocument();

  fireEvent.click(getByText("Back"));

  expect(queryByText(/Koen van Gilst/)).not.toBeInTheDocument();
});

it("should be possible to change the name", async () => {
  const { getByLabelText, getByText, getByRole } = renderWithRedux(<App />);

  const button = getByLabelText("Settings");

  fireEvent.mouseDown(button);

  expect(getByText(/Finding.../)).toBeInTheDocument();

  const input = getByRole("textbox");

  fireEvent.change(input, { target: { value: "TIBO" } });

  fireEvent.click(getByText("Save"));

  const heading = getByRole("heading");
  expect(heading).toHaveTextContent("TIBO");
});

it("should be not possible to change to a wrong name", async () => {
  const { getByLabelText, getByText, getByRole } = renderWithRedux(<App />);

  const button = getByLabelText("Settings");

  fireEvent.mouseDown(button);

  expect(getByText(/Finding.../)).toBeInTheDocument();

  const input = getByRole("textbox");

  fireEvent.change(input, { target: { value: "TIB" } });

  fireEvent.click(getByText("Save"));

  expect(getByRole("textbox")).toHaveClass("invalid");

  expect(getByText("Save")).toBeDisabled();

  expect(getByRole("heading")).toHaveTextContent("NORA");

  fireEvent.change(input, { target: { value: "THIS IS TO LONG A NAME" } });

  fireEvent.click(getByText("Save"));

  expect(getByRole("textbox")).toHaveClass("invalid");

  expect(getByText("Save")).toBeDisabled();

  expect(getByRole("heading")).toHaveTextContent("NORA");
});

it("should be possible to restart the game", async () => {
  const { getByLabelText, getByText, queryByText } = renderWithRedux(<App />);

  const A = getByText("A");
  fireEvent.mouseDown(A);
  expect(A).toHaveClass("orange");

  const button = getByLabelText("New game");

  fireEvent.mouseDown(button);

  expect(getByText(/New game/)).toBeInTheDocument();

  fireEvent.mouseDown(getByText("New game"));

  expect(queryByText(/New game/)).not.toBeInTheDocument();
  expect(getByText("A")).not.toHaveClass("orange");
});
