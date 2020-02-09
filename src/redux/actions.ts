import { GridItem } from "../types";

export const ADD_ANSWER = "ADD_ANSWER";
export const ADD_CORRECT = "CORRECT_ANSWER";
export const ADD_WRONG = "ADD_WRONG";
export const ADD_ALMOST = "ADD_ALMOST";
export const RESTART = "RESTART";
export const NEW_GAME = "NEW_GAME";
export const RESET = "RESET";
export const YOU_WON = "YOU_WON";

interface AddAnswerAction {
  type: typeof ADD_ANSWER;
  payload: string;
}

export function addAnswer(answer: string): AddAnswerAction {
  return {
    type: ADD_ANSWER,
    payload: answer
  };
}

interface AddCorrectAction {
  type: typeof ADD_CORRECT;
  payload: GridItem;
}

export function addCorrect(answer: GridItem): AddCorrectAction {
  return {
    type: ADD_CORRECT,
    payload: answer
  };
}

interface AddWrongAction {
  type: typeof ADD_WRONG;
  payload: GridItem;
}

export function addWrong(answer: GridItem): AddWrongAction {
  return {
    type: ADD_WRONG,
    payload: answer
  };
}

interface AddAlmostAction {
  type: typeof ADD_ALMOST;
  payload: GridItem;
}

export function addAlmost(answer: GridItem): AddAlmostAction {
  return {
    type: ADD_ALMOST,
    payload: answer
  };
}

interface RestartAction {
  type: typeof RESTART;
}

export function restart(): RestartAction {
  return {
    type: RESTART
  };
}

interface NewGameAction {
  type: typeof NEW_GAME;
}

export function newGame(): NewGameAction {
  return {
    type: NEW_GAME
  };
}

interface ResetAction {
  type: typeof RESET;
}

export function reset(): ResetAction {
  return {
    type: RESET
  };
}

interface YouWonAction {
  type: typeof YOU_WON;
}

export function youWon(): YouWonAction {
  return {
    type: YOU_WON
  };
}

export type ActionType =
  | AddAnswerAction
  | AddCorrectAction
  | AddWrongAction
  | AddAlmostAction
  | RestartAction
  | NewGameAction
  | ResetAction
  | YouWonAction;
