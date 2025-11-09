import '@testing-library/jest-dom'

// Mock canvas for Vitest (Confetti component needs canvas support)
HTMLCanvasElement.prototype.getContext = () => ({
  fillRect: () => {},
  clearRect: () => {},
  canvas: { width: 0, height: 0 },
  beginPath: () => {},
  arc: () => {},
  fill: () => {},
  stroke: () => {},
  closePath: () => {},
  moveTo: () => {},
  lineTo: () => {},
  save: () => {},
  restore: () => {},
  scale: () => {},
  translate: () => {},
  setTransform: () => {},
  measureText: () => ({ width: 0 }),
  fillText: () => {},
  drawImage: () => {},
}) as any;
