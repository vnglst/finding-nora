import "@testing-library/jest-dom/extend-expect";
import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  waitForElement,
  wait
} from "@testing-library/react";
import rootReducer from "shared/redux/root-reducer";
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
  const { getByLabelText, getByText, queryByText, debug } = renderWithRedux(
    <App />
  );

  const infoButton = getByLabelText("About this app");

  fireEvent.mouseDown(infoButton);

  expect(getByText(/Koen van Gilst/)).toBeInTheDocument();

  fireEvent.click(getByText("Back"));

  expect(queryByText(/Koen van Gilst/)).not.toBeInTheDocument();
});

it("should render Settings page when cog icon is clicked", async () => {
  const {
    getByLabelText,
    getByText,
    getByRole,
    queryByText,
    debug
  } = renderWithRedux(<App />);

  const button = getByLabelText("Settings");

  fireEvent.mouseDown(button);

  expect(getByText(/Finding.../)).toBeInTheDocument();

  const input = getByRole("textbox");

  fireEvent.change(input, { target: { value: "TIBO" } });

  fireEvent.click(getByText("Save"));

  const heading = getByRole("heading");
  expect(heading).toHaveTextContent("TIBO");
});
