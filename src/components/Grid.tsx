import React from 'react';
import { BlockShape } from './Block';

interface GridProps {
  grid: (string | null)[][];
  hoveredPosition?: { x: number; y: number } | null;
  currentBlock?: BlockShape | null;
  onCellClick: (x: number, y: number) => void;
  onCellHover: (x: number, y: number) => void;
}

export const Grid: React.FC<GridProps> = ({
  grid,
  hoveredPosition,
  currentBlock,
  onCellClick,
  onCellHover,
}) => {
  return (
    <div className="grid gap-1 bg-gray-800 p-2 rounded-lg shadow-xl">
      {grid.map((row, y) => (
        <div key={y} className="flex gap-1">
          {row.map((cell, x) => {
            const isHovered = hoveredPosition?.x === x && hoveredPosition?.y === y;
            const canPlace = isHovered && currentBlock;

            return (
              <div
                key={`${x}-${y}`}
                className={`w-8 h-8 rounded-sm transition-all duration-150 ${
                  cell
                    ? cell
                    : canPlace
                    ? 'bg-gray-600'
                    : 'bg-gray-700'
                } ${!cell ? 'hover:bg-gray-600' : ''}`}
                onClick={() => onCellClick(x, y)}
                onMouseEnter={() => onCellHover(x, y)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};