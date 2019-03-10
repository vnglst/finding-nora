export const sample = (arr: any[]) =>
  arr[Math.floor(Math.random() * arr.length)]

// What the compose below does is basically this:
// const compose = (a: any, b: any) => (x: any) => a(b(x))
// but then for any number of functions
export const compose = (...functions: any[]) => (data: any) =>
  functions.reduceRight((value, func) => func(value), data)

export const cloneDeep = compose(
  JSON.parse,
  JSON.stringify
)
