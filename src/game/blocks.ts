export const BLOCKS = [
  // Single square
  [[true]],
  
  // Line shapes
  [[true, true]],
  [[true, true, true]],
  
  // L shapes
  [
    [true, false],
    [true, true],
  ],
  [
    [false, true],
    [true, true],
  ],
  
  // T shape
  [
    [true, true, true],
    [false, true, false],
  ],
  
  // Z shapes
  [
    [true, true, false],
    [false, true, true],
  ],
  [
    [false, true, true],
    [true, true, false],
  ],
];

export const COLORS = [
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-red-500',
  'bg-purple-500',
  'bg-pink-500',
];

export const getRandomBlock = () => {
  const shape = BLOCKS[Math.floor(Math.random() * BLOCKS.length)];
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  return { shape, color };
};