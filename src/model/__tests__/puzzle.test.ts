import { generatePuzzle, findSolutions } from "../puzzle";
import { GridItem } from "../../types";
import { mockRandomForEach, resetMockRandom } from "jest-mock-random";

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
  mockRandomForEach([0.5, 0.2, 0.3, 0.6, 0.9, 0.33, 0.22, 0, 0.233]);

  afterEach(() => {
    resetMockRandom();
  });

  it("Should generate a 6 x 6 grid", () => {
    const puzzle = generatePuzzle(6, "NORA");
    expect(puzzle.length).toEqual(6);
    expect(puzzle[0].length).toEqual(6);

    const puzzleStr = toString(puzzle);

    expect(puzzleStr).toContain("N F H P X I");
    expect(puzzleStr).toContain("F A G N F H");
    expect(puzzleStr).toContain("P X I F A G");
    expect(puzzleStr).toContain("N N H P X I");
    expect(puzzleStr).toContain("F O R A F H");
    expect(puzzleStr).toContain("P X I F A G");
  });

  it("Should have one solutions", () => {
    const puzzle = generatePuzzle(6, "NORA");
    const solutions = findSolutions(puzzle, "NORA");

    expect(solutions).toEqual([
      [
        { row: 3, column: 1, letter: "N" },
        { row: 4, column: 1, letter: "O" },
        { row: 4, column: 2, letter: "R" },
        { row: 4, column: 3, letter: "A" }
      ]
    ]);
  });

  it("Should be able to find multiple long solutions", () => {
    const puzzle = generatePuzzle(6, "BARBARPAPA");
    const solutions = findSolutions(puzzle, "BARBARPAPA");

    expect(solutions).toEqual([
      [
        { row: 1, column: 0, letter: "B" },
        { row: 1, column: 1, letter: "A" },
        { row: 2, column: 1, letter: "R" },
        { row: 3, column: 1, letter: "B" },
        { row: 4, column: 1, letter: "A" },
        { row: 4, column: 2, letter: "R" },
        { row: 4, column: 3, letter: "P" },
        { row: 5, column: 3, letter: "A" },
        { row: 5, column: 4, letter: "P" },
        { row: 5, column: 5, letter: "A" }
      ],
      [
        { row: 1, column: 0, letter: "B" },
        { row: 2, column: 0, letter: "A" },
        { row: 2, column: 1, letter: "R" },
        { row: 3, column: 1, letter: "B" },
        { row: 4, column: 1, letter: "A" },
        { row: 4, column: 2, letter: "R" },
        { row: 4, column: 3, letter: "P" },
        { row: 5, column: 3, letter: "A" },
        { row: 5, column: 4, letter: "P" },
        { row: 5, column: 5, letter: "A" }
      ]
    ]);
  });
});
