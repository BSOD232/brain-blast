export const canPlaceBlock = (
  grid: (string | null)[][],
  block: boolean[][],
  x: number,
  y: number
): boolean => {
  if (y + block.length > grid.length || x + block[0].length > grid[0].length) {
    return false;
  }

  for (let i = 0; i < block.length; i++) {
    for (let j = 0; j < block[0].length; j++) {
      if (block[i][j] && grid[y + i][x + j] !== null) {
        return false;
      }
    }
  }

  return true;
};

export const placeBlock = (
  grid: (string | null)[][],
  block: boolean[][],
  color: string,
  x: number,
  y: number
): (string | null)[][] => {
  const newGrid = grid.map(row => [...row]);
  
  for (let i = 0; i < block.length; i++) {
    for (let j = 0; j < block[0].length; j++) {
      if (block[i][j]) {
        newGrid[y + i][x + j] = color;
      }
    }
  }

  return newGrid;
};

export const checkLines = (
  grid: (string | null)[][]
): { newGrid: (string | null)[][]; clearedLines: number } => {
  let clearedLines = 0;
  let newGrid = grid.map(row => [...row]);

  // Check rows
  for (let y = 0; y < grid.length; y++) {
    if (grid[y].every(cell => cell !== null)) {
      newGrid[y] = new Array(grid[0].length).fill(null);
      clearedLines++;
      
      // Move rows down
      for (let i = y; i > 0; i--) {
        newGrid[i] = [...newGrid[i - 1]];
      }
      newGrid[0] = new Array(grid[0].length).fill(null);
    }
  }

  // Check columns
  for (let x = 0; x < grid[0].length; x++) {
    if (grid.every(row => row[x] !== null)) {
      clearedLines++;
      for (let y = 0; y < grid.length; y++) {
        newGrid[y][x] = null;
      }
    }
  }

  return { newGrid, clearedLines };
};