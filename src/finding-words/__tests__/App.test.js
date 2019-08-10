import "@testing-library/jest-dom/extend-expect";
import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  waitForElement
} from "@testing-library/react";
import rootReducer from "shared/redux/root-reducer";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { mockMathRandom } from "../../shared/test-utils/mockMathRandom";
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
