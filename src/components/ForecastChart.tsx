import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface ForecastData {
  date: string;
  aqi: number;
  trend: 'up' | 'down' | 'stable';
}

interface ForecastChartProps {
  data: ForecastData[];
}

export const ForecastChart: React.FC<ForecastChartProps> = ({ data }) => {
  const maxAQI = Math.max(...data.map(d => d.aqi));
  const minAQI = Math.min(...data.map(d => d.aqi));

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return 'bg-green-500';
    if (aqi <= 100) return 'bg-yellow-500';
    if (aqi <= 150) return 'bg-orange-500';
    if (aqi <= 200) return 'bg-red-500';
    if (aqi <= 300) return 'bg-purple-500';
    return 'bg-red-900';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return TrendingUp;
      case 'down': return TrendingDown;
      default: return Minus;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">5-Day Forecast</h3>
      
      <div className="space-y-4">
        {data.map((item, index) => {
          const TrendIcon = getTrendIcon(item.trend);
          const height = ((item.aqi - minAQI) / (maxAQI - minAQI)) * 100;
          
          return (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-16 text-sm font-medium text-gray-600">
                {new Date(item.date).toLocaleDateString('en-US', { 
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric'
                })}
              </div>
              
              <div className="flex-1 flex items-center space-x-3">
                <div className="w-full bg-gray-200 rounded-full h-3 relative">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${getAQIColor(item.aqi)}`}
                    style={{ width: `${height}%` }}
                  ></div>
                </div>
                
                <div className="flex items-center space-x-2 min-w-0">
                  <span className="text-sm font-semibold text-gray-800">{item.aqi}</span>
                  <TrendIcon className={`h-4 w-4 ${
                    item.trend === 'up' ? 'text-red-500' : 
                    item.trend === 'down' ? 'text-green-500' : 
                    'text-gray-400'
                  }`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};