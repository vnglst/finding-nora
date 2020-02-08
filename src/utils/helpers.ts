import { createPseudoRnd } from "./pseudoRnd";

// Use a pseudo random function with seed number in cypress test
// for repeatable test scenarios in unit + e2e tests
const usePseudoRnd = process.env.REACT_APP_PSEUDO_RND === "true";
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

export function deepEqual<T>(obj1: T, obj2: T) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export function cloneDeep<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}
