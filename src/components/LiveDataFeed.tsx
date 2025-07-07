import React, { useState, useEffect } from 'react';
import { Activity, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

interface DataPoint {
  timestamp: string;
  location: string;
  aqi: number;
  trend: 'up' | 'down' | 'stable';
  alert: boolean;
}

export const LiveDataFeed: React.FC = () => {
  const [dataFeed, setDataFeed] = useState<DataPoint[]>([]);

  useEffect(() => {
    const generateDataPoint = (): DataPoint => {
      const locations = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad'];
      const location = locations[Math.floor(Math.random() * locations.length)];
      const aqi = Math.floor(Math.random() * 200) + 20;
      
      return {
        timestamp: new Date().toLocaleTimeString(),
        location,
        aqi,
        trend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)] as 'up' | 'down' | 'stable',
        alert: aqi > 150
      };
    };

    const interval = setInterval(() => {
      setDataFeed(prev => {
        const newData = generateDataPoint();
        return [newData, ...prev.slice(0, 9)]; // Keep last 10 entries
      });
    }, 2000);

    // Initialize with some data
    setDataFeed(Array.from({ length: 5 }, generateDataPoint));

    return () => clearInterval(interval);
  }, []);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return TrendingUp;
      case 'down': return TrendingDown;
      default: return Activity;
    }
  };

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return 'text-green-400';
    if (aqi <= 100) return 'text-yellow-400';
    if (aqi <= 150) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-black/90 rounded-2xl p-6 text-white shadow-2xl border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-500 rounded-lg animate-pulse">
            <Activity className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Live Data Stream</h3>
            <p className="text-gray-400 text-sm">Real-time satellite updates</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm text-green-400">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
          <span>STREAMING</span>
        </div>
      </div>
      
      <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
        {dataFeed.map((data, index) => {
          const TrendIcon = getTrendIcon(data.trend);
          
          return (
            <div 
              key={index} 
              className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-300 ${
                index === 0 ? 'bg-blue-500/20 border-blue-500/50 animate-pulse' : 'bg-gray-800/50 border-gray-700/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="text-xs text-gray-400 w-16">{data.timestamp}</div>
                <div className="font-medium">{data.location}</div>
                {data.alert && <AlertTriangle className="h-4 w-4 text-red-400 animate-pulse" />}
              </div>
              
              <div className="flex items-center space-x-3">
                <span className={`font-bold ${getAQIColor(data.aqi)}`}>
                  AQI {data.aqi}
                </span>
                <TrendIcon className={`h-4 w-4 ${
                  data.trend === 'up' ? 'text-red-400' : 
                  data.trend === 'down' ? 'text-green-400' : 
                  'text-gray-400'
                }`} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};