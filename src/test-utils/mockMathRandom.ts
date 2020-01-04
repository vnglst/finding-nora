export const mockMathRandom = (seed = 42) => {
  const mockGlobalMathLibrary = Object.create(global.Math);
  mockGlobalMathLibrary.random = generatePseudoRandomNumberWithSeed(seed);
  global.Math = mockGlobalMathLibrary;
};

const generatePseudoRandomNumberWithSeed = (seed: number) => {
  const generatePseudoRandomNumber = () => {
    const pseudoRandomNumber = Math.sin(seed++) * 10000;
    return pseudoRandomNumber - Math.floor(pseudoRandomNumber);
  };
  return generatePseudoRandomNumber;
};
