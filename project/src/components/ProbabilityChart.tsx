import React from 'react';
import { LineChart } from 'lucide-react';

interface ProbabilityChartProps {
  probability: number;
}

const ProbabilityChart: React.FC<ProbabilityChartProps> = ({ probability }) => {
  const generateMockData = () => {
    const points = [];
    let currentProb = probability - 15;
    for (let i = 0; i < 10; i++) {
      currentProb += Math.random() * 6 - 3;
      points.push(Math.max(0, Math.min(100, currentProb)));
    }
    points.push(probability);
    return points;
  };

  const dataPoints = generateMockData();
  const maxValue = Math.max(...dataPoints);
  const minValue = Math.min(...dataPoints);

  return (
    <div className="h-full w-full relative bg-black rounded-lg p-4 border border-zinc-800">
      <div className="absolute top-2 left-4 text-sm text-zinc-400">Win Probability</div>
      
      {/* Y-axis labels */}
      <div className="absolute left-2 top-8 bottom-8 flex flex-col justify-between text-xs text-zinc-500">
        <span>{Math.ceil(maxValue)}%</span>
        <span>{Math.floor(minValue)}%</span>
      </div>

      {/* Chart visualization */}
      <div className="absolute inset-0 flex items-center justify-center">
        <LineChart className="w-full h-px text-white" />
      </div>

      {/* Current probability indicator */}
      <div 
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-black px-3 py-1 rounded-full text-sm font-semibold"
      >
        {probability}%
      </div>
    </div>
  );
};

export default ProbabilityChart;