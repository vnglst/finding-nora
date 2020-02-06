import { sample, deepEqual, getRnd } from "../utils/helpers";
import {
  mirrorMatrixHorizontally,
  rotateMatrixCounterClockwise
} from "./matrix";
import { GridItem } from "../types";

const NOISE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function generatePuzzle(size: number, solution: string) {
  const grid: GridItem[][] = [];

  // generate a grid of empty letters
  for (let row = 0; row < size; row++) {
    const columns = [];
    for (let column = 0; column < size; column++) {
      const randomLetter = sample(NOISE);
      columns.push({
        row,
        column,
        letter: randomLetter
      });
    }
    grid.push(columns);
  }

  // helper function to calculate number of letters from current row,column to edge
  function getStepsToEdge(row: number, column: number, size: number) {
    const edgeStep = 1;
    return size - row + size - column - edgeStep;
  }

  // check if solution is actually possible within grid size
  const stepsToEdgeFromOrigin = getStepsToEdge(0, 0, size);
  const requiredSteps = solution.length;
  if (requiredSteps > stepsToEdgeFromOrigin) {
    throw new Error("Puzzle too long");
  }

  // find randomized and possible initial position for puzzle
  let startRow = getRnd(size);
  let startColumn = getRnd(size);
  let counter = 0;

  while (counter < 500) {
    const stepsToEdge = getStepsToEdge(startRow, startColumn, size);

    // stop loop if solution found
    if (requiredSteps <= stepsToEdge) break;

    // try new initial position
    startRow = getRnd(size);
    startColumn = getRnd(size);

    // failsafe to avoid accidental inifite loops
    counter++;
  }

  // loop through letters and create random through grid
  let nextRow = startRow;
  let nextColumn = startColumn;
  for (const letter of solution) {
    grid[nextRow][nextColumn].letter = letter;

    // find possible next moves, only moves from left to right, top to bottom allowed
    const nextMoves = [];
    if (nextRow + 1 < size) {
      nextMoves.push({
        row: nextRow + 1,
        column: nextColumn
      });
    }
    if (nextColumn + 1 < size) {
      nextMoves.push({
        row: nextRow,
        column: nextColumn + 1
      });
    }

    if (nextMoves.length > 0) {
      const nextMove = sample(nextMoves);
      nextRow = nextMove.row;
      nextColumn = nextMove.column;
    }
  }

  return applyRandomTransformation(grid);
}

function applyRandomTransformation(grid: GridItem[][]) {
  const transformation = sample([
    (g: GridItem[][]) => g, // do nothing
    mirrorMatrixHorizontally,
    rotateMatrixCounterClockwise
  ]);
  grid = transformation(grid);
  updateIndices(grid);
  return grid;
}

function updateIndices(grid: GridItem[][]) {
  grid.forEach((columns, row) =>
    columns.map(
      (el, column) =>
        (grid[row][column] = {
          ...el,
          column,
          row
        })
    )
  );
}

export function findSolutions(grid: GridItem[][], solution: string) {
  const size = grid.length;
  const solutions: GridItem[][] = [];

  const DIRECTIONS = [
    [-1, 0],
    [0, -1],
    [0, 1],
    [1, 0]
  ];

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const firstItem = grid[i][j];
      const possibleSolution: GridItem[] = [];
      if (firstItem.letter === solution[0]) {
        findNext(firstItem, 0, possibleSolution, solutions);
      }
    }
  }

  function findNext(
    item: GridItem,
    idx: number,
    possibleSolution: GridItem[],
    solutions: GridItem[][]
  ) {
    // stop if item is not part of solution
    if (idx > solution.length || item.letter !== solution[idx]) return;

    // new letter found, create new solution path
    const newSolution = [...possibleSolution, item];

    // solution complete, add to array of solutions
    if (idx === solution.length - 1) {
      solutions.push(newSolution);
      return solutions;
    }

    // check for new solution paths in every direction
    DIRECTIONS.forEach(dir => {
      const nextRow = item.row + dir[0];
      const nextColumn = item.column + dir[1];

      // stop if next position in the grid is out of bounds
      if (!withinBounds(nextRow, nextColumn, size)) return;

      const nextItem = grid[nextRow][nextColumn];

      // stop if next grid item is already in the solution, i.e. no backtracking on same letters allowed in solutions
      if (!isNew(newSolution, nextItem)) return;

      // new solution path found, follow this path
      findNext(nextItem, idx + 1, newSolution, solutions);
    });
  }

  return solutions;
}

function withinBounds(row: number, column: number, size: number) {
  return row >= 0 && row < size && column >= 0 && column < size;
}

function isNew(solution: GridItem[], newItem: GridItem) {
  let isNew = true;
  solution.forEach(item => {
    if (deepEqual(newItem, item)) {
      isNew = false;
    }
  });
  return isNew;
}

export function filterPossibleSolutions(
  solutions: GridItem[][],
  answer: GridItem
) {
  return solutions.filter(solution => {
    const next = solution[0];
    return next.row === answer.row && next.column === answer.column;
  });
}
