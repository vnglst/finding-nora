import "@testing-library/jest-dom/extend-expect";
import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  waitForElement
} from "@testing-library/react";
import rootReducer from "../redux/root-reducer";
import { Provider } from "react-redux";
import { createStore } from "redux";
import App from "../AppContainer";

afterEach(() => {
  cleanup();
});

function renderWithRedux(
  ui,
  { initialState, store = createStore(rootReducer, initialState) } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store
  };
}

it("should be possible to finish game by clicking NORA", async () => {
  const { getByRole, getByText, queryByText } = renderWithRedux(<App />);
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

  fireEvent.mouseDown(N);
  expect(N).toHaveClass("green");

  fireEvent.mouseDown(O);
  expect(O).toHaveClass("green");

  fireEvent.mouseDown(R);
  expect(R).toHaveClass("green");

  fireEvent.mouseDown(A);
  expect(A).toHaveClass("green");

  const youWon = await waitForElement(() => getByText("YOU WON"));

  expect(youWon).toBeInTheDocument();

  fireEvent.mouseDown(getByText("Play again?"));

  expect(queryByText("Play again?")).not.toBeInTheDocument();
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

it("should be not possible to change to a too short name", async () => {
  const { getByLabelText, getByText, getByRole, debug } = renderWithRedux(
    <App />
  );

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
