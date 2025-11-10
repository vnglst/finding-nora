import { createPseudoRnd } from "./pseudoRnd";

// Use a pseudo random function with seed number in cypress test
// for repeatable test scenarios in unit + e2e tests
const usePseudoRnd = import.meta.env.VITE_PSEUDO_RND === "true";
const rnd = usePseudoRnd ? createPseudoRnd() : () => Math.random();

export function getRnd(max: number) {
  return Math.floor(rnd() * max);
}

export function shuffle<T>(arr: T[]): T[] {
  return arr.sort(() => rnd() - 0.5);
}

export function sample<T>(arr: T[]) {
  return arr[Math.floor(rnd() * arr.length)];
}

// Simple equality check for GridItem objects comparing row and column
export function gridItemEquals(item1: { row: number; column: number }, item2: { row: number; column: number }) {
  return item1.row === item2.row && item1.column === item2.column;
}
