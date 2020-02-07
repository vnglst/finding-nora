import React from "react";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { mockRandomForEach, resetMockRandom } from "jest-mock-random";
import { reducers } from "../redux/reducers";
import { middleware } from "../redux/middleware";
import App from "../App";

function renderWithRedux(
  ui,
  { store = createStore(reducers, applyMiddleware(middleware)) } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store
  };
}

jest
  .spyOn(window.HTMLMediaElement.prototype, "play")
  .mockImplementation(async () => {});

jest
  .spyOn(window.HTMLMediaElement.prototype, "load")
  .mockImplementation(() => {});

Object.defineProperty(window, "localStorage", {
  value: {
    setItem: jest.fn().mockImplementation(() => {}),
    getItem: jest.fn().mockImplementation(() => {})
  }
});

describe("App", () => {
  mockRandomForEach([0.5, 0.2, 0.3, 0.6, 0.9, 0.33, 0.22, 0, 0.233]);

  afterEach(() => {
    resetMockRandom();
  });

  it("should be able to click letters NORA and play new game", async () => {
    const screen = renderWithRedux(<App />);
    const heading = screen.getByRole("heading");
    expect(heading).toHaveTextContent("NORA");

    let allItems = screen.getAllByTestId(/grid-item/);

    allItems.forEach(item => {
      expect(item).not.toHaveClass("green");
      expect(item).not.toHaveClass("orange");
      expect(item).not.toHaveClass("red");
    });

    const N = screen.getAllByText("N")[2];
    const O = screen.getAllByText("O")[0];
    const R = screen.getAllByText("R")[0];
    const A = screen.getAllByText("A")[0];

    expect(N).toBeInTheDocument();
    expect(O).toBeInTheDocument();
    expect(R).toBeInTheDocument();
    expect(A).toBeInTheDocument();

    fireEvent.mouseDown(N);
    expect(N).toHaveClass("green");

    fireEvent.mouseDown(O);
    expect(O).toHaveClass("green");

    fireEvent.mouseDown(R);
    expect(O).toHaveClass("green");

    fireEvent.mouseDown(A);
    expect(O).toHaveClass("green");

    const playAgain = screen.getByText("Play again?");
    expect(playAgain).toBeInTheDocument();
    fireEvent.mouseDown(playAgain);

    allItems = screen.getAllByTestId(/grid-item/);

    allItems.forEach(item => {
      expect(item).not.toHaveClass("green");
      expect(item).not.toHaveClass("orange");
      expect(item).not.toHaveClass("red");
    });
  });

  it("should render About page when info icon is clicked", async () => {
    const { getByLabelText, getByText, queryByText } = renderWithRedux(<App />);

    const infoButton = getByLabelText("About this app");

    fireEvent.mouseDown(infoButton);

    expect(getByText(/Koen van Gilst/)).toBeInTheDocument();

    fireEvent.click(getByText("Back"));

    expect(queryByText(/Koen van Gilst/)).not.toBeInTheDocument();
  });

  it("should be possible to change the name and play the game", async () => {
    const screen = renderWithRedux(<App />);

    const button = screen.getByLabelText("Settings");

    fireEvent.mouseDown(button);

    expect(screen.getByText(/Finding.../)).toBeInTheDocument();

    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "TIBO" } });

    fireEvent.click(screen.getByText("Save"));

    const heading = screen.getByRole("heading");
    expect(heading).toHaveTextContent("TIBO");

    const T = screen.getAllByText("T")[0];
    const I = screen.getAllByText("I")[2];
    const B = screen.getAllByText("B")[0];
    const O = screen.getAllByText("O")[0];

    fireEvent.mouseDown(T);
    expect(T).toHaveClass("green");

    fireEvent.mouseDown(I);
    expect(I).toHaveClass("green");

    fireEvent.mouseDown(B);
    expect(B).toHaveClass("green");

    fireEvent.mouseDown(O);
    expect(O).toHaveClass("green");

    const playAgain = screen.getByText("Play again?");
    expect(playAgain).toBeInTheDocument();
  });

  it("should be possible to click all letters and then finish the game", async () => {
    const screen = renderWithRedux(<App />);
    const heading = screen.getByRole("heading");
    expect(heading).toHaveTextContent("NORA");

    const allItems = screen.getAllByTestId(/grid-item/);

    allItems.forEach(item => {
      expect(item).not.toHaveClass("green");
      expect(item).not.toHaveClass("orange");
      expect(item).not.toHaveClass("red");
    });

    allItems.forEach(item => {
      fireEvent.mouseDown(item);
    });

    const O = screen.getByTestId(/grid-item-2-0/);
    const R = screen.getByTestId(/grid-item-2-1/);
    const A = screen.getByTestId(/grid-item-2-2/);

    fireEvent.mouseDown(O);
    fireEvent.mouseDown(R);
    fireEvent.mouseDown(A);

    expect(screen.getByText("YOU WON")).toBeInTheDocument();
  });

  it("should be NOT possible to change to a wrong name", async () => {
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
    const {
      getByLabelText,
      getByText,
      getAllByText,
      queryByText
    } = renderWithRedux(<App />);

    const A = getAllByText("A")[0];
    fireEvent.mouseDown(A);
    expect(A).toHaveClass("orange");

    const button = getByLabelText("New game");

    fireEvent.mouseDown(button);

    expect(getByText(/New game/)).toBeInTheDocument();

    fireEvent.mouseDown(getByText("New game"));

    expect(queryByText(/New game/)).not.toBeInTheDocument();
    expect(getAllByText("A")[0]).not.toHaveClass("orange");
  });
});
