import React from 'react';
import { Trophy } from 'lucide-react';

interface ScoreBoardProps {
  score: number;
  highScore: number;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, highScore }) => {
  return (
    <div className="flex gap-6 text-white">
      <div className="bg-gray-800 p-4 rounded-lg flex items-center gap-2">
        <span className="text-gray-400">Score:</span>
        <span className="text-2xl font-bold">{score}</span>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg flex items-center gap-2">
        <Trophy className="text-yellow-500" />
        <span className="text-gray-400">Best:</span>
        <span className="text-2xl font-bold">{highScore}</span>
      </div>
    </div>
  );
};