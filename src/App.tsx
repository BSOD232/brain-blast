import React, { useState, useEffect } from 'react';
import { Grid } from './components/Grid';
import { BlockSelector } from './components/BlockSelector';
import { ScoreBoard } from './components/ScoreBoard';
import { getRandomBlock } from './game/blocks';
import { canPlaceBlock, placeBlock, checkLines } from './game/gameLogic';
import { Gamepad2 } from 'lucide-react';

const GRID_SIZE = 10;
const BLOCKS_PER_ROUND = 3;

function App() {
  const [grid, setGrid] = useState<(string | null)[][]>(
    Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null))
  );
  const [availableBlocks, setAvailableBlocks] = useState(() =>
    Array(BLOCKS_PER_ROUND).fill(null).map(() => getRandomBlock())
  );
  const [selectedBlockIndex, setSelectedBlockIndex] = useState<number | null>(null);
  const [hoveredPosition, setHoveredPosition] = useState<{ x: number; y: number } | null>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const savedHighScore = localStorage.getItem('blockBlastHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);

  const handleBlockSelect = (index: number) => {
    setSelectedBlockIndex(index);
  };

  const handleCellHover = (x: number, y: number) => {
    setHoveredPosition({ x, y });
  };

  const handleCellClick = (x: number, y: number) => {
    if (selectedBlockIndex === null || gameOver) return;

    const block = availableBlocks[selectedBlockIndex];
    if (!block) return;

    if (canPlaceBlock(grid, block.shape, x, y)) {
      const newGrid = placeBlock(grid, block.shape, block.color, x, y);
      const { newGrid: clearedGrid, clearedLines } = checkLines(newGrid);
      
      setGrid(clearedGrid);
      setScore(prev => {
        const newScore = prev + (clearedLines * 100) + 10;
        if (newScore > highScore) {
          setHighScore(newScore);
          localStorage.setItem('blockBlastHighScore', newScore.toString());
        }
        return newScore;
      });

      const newBlocks = [...availableBlocks];
      newBlocks[selectedBlockIndex] = null;
      setAvailableBlocks(newBlocks);
      setSelectedBlockIndex(null);

      if (newBlocks.every(block => block === null)) {
        setAvailableBlocks(Array(BLOCKS_PER_ROUND).fill(null).map(() => getRandomBlock()));
      }

      // Check for game over
      const remainingBlocks = newBlocks.filter(block => block !== null);
      if (remainingBlocks.length === 0) {
        let canPlaceAny = false;
        const nextBlocks = Array(BLOCKS_PER_ROUND).fill(null).map(() => getRandomBlock());
        
        for (const block of nextBlocks) {
          for (let i = 0; i < GRID_SIZE; i++) {
            for (let j = 0; j < GRID_SIZE; j++) {
              if (canPlaceBlock(clearedGrid, block.shape, j, i)) {
                canPlaceAny = true;
                break;
              }
            }
            if (canPlaceAny) break;
          }
          if (canPlaceAny) break;
        }

        if (!canPlaceAny) {
          setGameOver(true);
        }
      }
    }
  };

  const resetGame = () => {
    setGrid(Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null)));
    setAvailableBlocks(Array(BLOCKS_PER_ROUND).fill(null).map(() => getRandomBlock()));
    setSelectedBlockIndex(null);
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8">
      <div className="flex items-center gap-4 mb-8">
        <Gamepad2 className="w-8 h-8 text-blue-500" />
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Block Blast
        </h1>
      </div>

      <ScoreBoard score={score} highScore={highScore} />

      <div className="my-8">
        <Grid
          grid={grid}
          hoveredPosition={hoveredPosition}
          currentBlock={selectedBlockIndex !== null ? availableBlocks[selectedBlockIndex]?.shape : null}
          onCellClick={handleCellClick}
          onCellHover={handleCellHover}
        />
      </div>

      <BlockSelector
        blocks={availableBlocks.filter(block => block !== null)}
        onSelectBlock={handleBlockSelect}
        selectedIndex={selectedBlockIndex}
      />

      {gameOver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
            <p className="mb-4">Final Score: {score}</p>
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              onClick={resetGame}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;