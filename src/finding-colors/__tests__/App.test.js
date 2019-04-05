import "jest-dom/extend-expect"
import React from "react"
import {
  cleanup,
  fireEvent,
  render,
  waitForElement
} from "react-testing-library"
import { mockMathRandom } from "../../shared/test-utils/mockMathRandom"
import App from "../App"

mockMathRandom()

let question
let getByTestId
let utils

beforeEach(() => {
  utils = render(<App />)
  getByTestId = utils.getByTestId
  question = getByTestId("question")
})

afterEach(() => {
  cleanup()
})

it("should render App with question ORANGE", () => {
  expect(question.textContent).toContain("ORANGE")
})

it("should show you won when pressing correct color", async () => {
  const orangeButton = getByTestId(`button-orange`)
  expect(orangeButton).toBeInTheDocument()
  fireEvent.mouseDown(orangeButton)
  await waitForElement(() => getByTestId("youwon"))
  const youWon = getByTestId("youwon")
  expect(youWon).toBeInTheDocument()
})
