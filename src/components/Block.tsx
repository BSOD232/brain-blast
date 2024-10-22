import React from 'react';

export type BlockShape = boolean[][];

interface BlockProps {
  shape: BlockShape;
  color: string;
  isPreview?: boolean;
  onClick?: () => void;
}

export const Block: React.FC<BlockProps> = ({ shape, color, isPreview, onClick }) => {
  const baseClasses = `grid gap-1 ${isPreview ? 'cursor-pointer hover:opacity-75' : ''}`;
  
  return (
    <div 
      className={baseClasses}
      style={{ 
        gridTemplateRows: `repeat(${shape.length}, minmax(0, 1fr))`,
        gridTemplateColumns: `repeat(${shape[0].length}, minmax(0, 1fr))`
      }}
      onClick={onClick}
    >
      {shape.map((row, i) =>
        row.map((cell, j) => (
          <div
            key={`${i}-${j}`}
            className={`w-6 h-6 rounded-sm transition-colors ${
              cell ? color : 'bg-transparent'
            }`}
          />
        ))
      )}
    </div>
  );
};