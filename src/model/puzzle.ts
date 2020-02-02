import { sample, deepEqual, getRnd } from "../utils/helpers";
import { mirrorMatrixHorizontally, rotateMatrixCounterClockwise } from './matrix';
import { IGridItem } from "../types";

const NOISE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function generatePuzzle(size: number, solution: string) {
  const grid = generateGrid(size, NOISE);
  const gridWithPuzzle = addPuzzle(grid, solution);
  const tranformed = applyRandomTransformation(gridWithPuzzle);
  return tranformed;
}

function generateGrid(size: number, noise: string[]) {
  const grid: IGridItem[][] = [];
  for (let row = 0; row < size; row++) {
    const columns = [];
    for (let column = 0; column < size; column++) {
      const randomLetter = sample(noise);
      columns.push({
        row,
        column,
        letter: randomLetter,
      });
    }
    grid.push(columns);
  }
  return grid;
}

function addPuzzle(grid: IGridItem[][], solution: string) {
  const size = grid.length;

  // check if solution is actually possible within grid
  checkSolutionLength(size, solution);

  let [row, column] = getRandomStart(size, solution);

  for (const letter of solution) {
    grid[row][column].letter = letter

    const nextMoves = getNextMoves(row, column, size);

    if (nextMoves.length > 0) {
      const nextMove = sample(nextMoves);
      row = nextMove.row;
      column = nextMove.column;
    }
  };

  return grid;
}

function checkSolutionLength(size: number, solution: string) {
  const stepsToEdgeFromOrigin = getStepsToEdge(0, 0, size);
  const requiredSteps = solution.length;
  if (requiredSteps > stepsToEdgeFromOrigin) {
    throw new Error("Puzzle too long");
  }
}

function getStepsToEdge(row: number, column: number, size: number) {
  const edgeStep = 1;
  return size - row + size - column - edgeStep;
}

function getRandomStart(size: number, solution: string) {
  let startRow = getRnd(size);
  let startColumn = getRnd(size);
  const requiredSteps = solution.length;
  let counter = 0;
  while (true) {
    const stepsToEdge = getStepsToEdge(startRow, startColumn, size);

    if (requiredSteps <= stepsToEdge) {
      return [
        startRow,
        startColumn
      ];
    }

    startRow = getRnd(size);
    startColumn = getRnd(size);

    // failsafe to avoid accidental inifite loops
    counter++;
    if (counter > 100) {
      throw new Error("Tried to generate puzzle too many times.");
    }
  }
}

function getNextMoves(row: number, column: number, size: number) {
  // only moves from left to right, top to bottom allowed
  const legalMoves = [];
  if (row + 1 < size) {
    legalMoves.push({
      row: row + 1,
      column
    });
  }
  if (column + 1 < size) {
    legalMoves.push({
      row,
      column: column + 1
    });
  }
  return legalMoves;
}

function applyRandomTransformation(grid: IGridItem[][]) {
  const transformation = sample([
    (g: IGridItem[][]) => g, // do nothing
    mirrorMatrixHorizontally,
    rotateMatrixCounterClockwise
  ]);
  grid = transformation(grid);
  updateIndices(grid);
  return grid;
}

function updateIndices(grid: IGridItem[][]) {
  grid.forEach((columns, row) =>
    columns.map((el, column) => grid[row][column] = {
      ...el,
      column,
      row
    })
  );
}


export function findSolutions(grid: IGridItem[][], solution: string) {
  const size = grid.length;
  let solutions: IGridItem[][] = [];

  const DIRECTIONS = [
    [-1, 0],
    [0, -1],
    [0, 1],
    [1, 0],
  ];

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const firstItem = grid[i][j];
      const possibleSolution: IGridItem[] = [];
      if (firstItem.letter === solution[0]) {
        findNext(firstItem, 0, possibleSolution, solutions)
      }
    }
  }

  function findNext(item: IGridItem, idx: number, possibleSolution: IGridItem[], solutions: IGridItem[][]) {

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
      findNext(nextItem, idx + 1, newSolution, solutions)
    })
  }

  return solutions;
}

function withinBounds(row: number, column: number, size: number) {
  return row >= 0 && row < size &&
    column >= 0 && column < size
}

function isNew(solution: IGridItem[], newItem: IGridItem) {
  let isNew = true;
  solution.forEach(item => {
    if (deepEqual(newItem, item)) {
      isNew = false;
    }
  })
  return isNew;
}

export function filterPossibleSolutions(solutions: IGridItem[][], answer: IGridItem) {
  return solutions.filter((solution) => {
    const next = solution[0];
    return next.row === answer.row && next.column === answer.column;
  });
}
