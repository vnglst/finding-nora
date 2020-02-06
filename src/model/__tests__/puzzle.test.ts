import { mockMathRandom } from "../../test-utils/mockMathRandom";
import { generatePuzzle, findSolutions } from "../puzzle";
import { GridItem } from "../../types";

beforeEach(() => {
  mockMathRandom();
});

function toString(grid: GridItem[][]) {
  let s = "";
  grid.forEach(row => {
    row.forEach(item => {
      s += item.letter + " ";
    });
    s += "\n";
  });
  return s;
}

describe("Puzzle", () => {
  it("Should generate a 6 x 6 grid", () => {
    const puzzle = generatePuzzle(6, "NORA");
    expect(puzzle.length).toEqual(6);
    expect(puzzle[0].length).toEqual(6);

    const puzzleStr = toString(puzzle);

    expect(puzzleStr).toContain("G H N E B F");
    expect(puzzleStr).toContain("M U S D X O");
    expect(puzzleStr).toContain("X V F O G H");
    expect(puzzleStr).toContain("C L M Q S J");
    expect(puzzleStr).toContain("O R A H H G");
    expect(puzzleStr).toContain("N G A A W T");
  });

  it("Should have one solutions", () => {
    const puzzle = generatePuzzle(6, "NORA");
    const solutions = findSolutions(puzzle, "NORA");
    expect(solutions).toEqual([
      [
        { row: 5, column: 0, letter: "N" },
        { row: 4, column: 0, letter: "O" },
        { row: 4, column: 1, letter: "R" },
        { row: 4, column: 2, letter: "A" }
      ]
    ]);
  });

  it("Should be able to find many long solutions", () => {
    const puzzle = generatePuzzle(6, "BARBARAPAPA");
    const solutions = findSolutions(puzzle, "BARBARAPAPA");

    expect(solutions).toEqual([
      [
        { row: 5, column: 0, letter: "B" },
        { row: 4, column: 0, letter: "A" },
        { row: 4, column: 1, letter: "R" },
        { row: 4, column: 2, letter: "B" },
        { row: 3, column: 2, letter: "A" },
        { row: 2, column: 2, letter: "R" },
        { row: 2, column: 3, letter: "A" },
        { row: 2, column: 4, letter: "P" },
        { row: 2, column: 5, letter: "A" },
        { row: 1, column: 5, letter: "P" },
        { row: 0, column: 5, letter: "A" }
      ]
    ]);
  });
});
