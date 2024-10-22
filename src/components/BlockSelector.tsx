import React from 'react';
import { Block, BlockShape } from './Block';

interface BlockSelectorProps {
  blocks: { shape: BlockShape; color: string }[];
  onSelectBlock: (index: number) => void;
  selectedIndex: number | null;
}

export const BlockSelector: React.FC<BlockSelectorProps> = ({
  blocks,
  onSelectBlock,
  selectedIndex,
}) => {
  return (
    <div className="flex gap-6 p-4 bg-gray-800 rounded-lg">
      {blocks.map((block, index) => (
        <div
          key={index}
          className={`p-2 rounded-lg transition-all ${
            selectedIndex === index
              ? 'bg-gray-600 scale-110'
              : 'bg-gray-700 hover:bg-gray-600'
          }`}
        >
          <Block
            shape={block.shape}
            color={block.color}
            isPreview={true}
            onClick={() => onSelectBlock(index)}
          />
        </div>
      ))}
    </div>
  );
};