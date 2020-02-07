export function createPseudoRnd(seed = 42) {
  const pseudoRnd = () => {
    const pseudoRandomNumber = Math.sin(seed++) * 10000;
    return pseudoRandomNumber - Math.floor(pseudoRandomNumber);
  };
  return pseudoRnd;
}
