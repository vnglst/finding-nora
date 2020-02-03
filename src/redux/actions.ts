import { IGridItem } from '../types';

export const ADD_SOLUTION = 'ADD_SOLUTION';
export const ADD_CORRECT = 'CORRECT_ANSWER';
export const ADD_WRONG = 'ADD_WRONG';
export const ADD_ALMOST = 'ADD_ALMOST';
export const RESTART = 'RESTART';
export const YOU_WON = 'YOU_WON';

interface AddSolutionAction {
    type: typeof ADD_SOLUTION
    payload: string
}

export function addSolution(solution: string): AddSolutionAction {
    return {
        type: ADD_SOLUTION,
        payload: solution
    }
}

interface AddCorrectAction {
    type: typeof ADD_CORRECT
    payload: IGridItem
}

export function addCorrect(answer: IGridItem): AddCorrectAction {
    return {
        type: ADD_CORRECT,
        payload: answer
    }
}

interface AddWrongAction {
    type: typeof ADD_WRONG
    payload: IGridItem
}

export function addWrong(answer: IGridItem): AddWrongAction {
    return {
        type: ADD_WRONG,
        payload: answer
    }
}

interface AddAlmostAction {
    type: typeof ADD_ALMOST
    payload: IGridItem
}

export function addAlmost(answer: IGridItem): AddAlmostAction {
    return {
        type: ADD_ALMOST,
        payload: answer
    }
}

interface RestartAction {
    type: typeof RESTART
}

export function restart(): RestartAction {
    return {
        type: RESTART,
    }
}

interface YouWonAction {
    type: typeof YOU_WON
}

export function youWon(): YouWonAction {
    return {
        type: YOU_WON
    }
}

export type ActionType =
    AddSolutionAction |
    AddCorrectAction |
    AddWrongAction |
    AddAlmostAction |
    RestartAction |
    YouWonAction