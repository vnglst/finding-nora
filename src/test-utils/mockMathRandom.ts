export const mockMathRandom = () => {
  const mockGlobalMathLibrary = Object.create(global.Math);
  mockGlobalMathLibrary.random = generatePseudoRandomNumberWithSeed(43);
  global.Math = mockGlobalMathLibrary;
};

const generatePseudoRandomNumberWithSeed = (seed: number) => {
  const generatePseudoRandomNumber = () => {
    const pseudoRandomNumber = Math.sin(seed++) * 10000;
    return pseudoRandomNumber - Math.floor(pseudoRandomNumber);
  };
  return generatePseudoRandomNumber;
};
