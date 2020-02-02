export function getRnd(max: number) {
  return Math.floor(Math.random() * max);
}

export function sample<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function deepEqual<T>(obj1: T, obj2: T) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

export function cloneDeep<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
};
