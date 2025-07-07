import React from 'react';
import { Activity, Droplets, Wind, Zap } from 'lucide-react';

interface PollutantData {
  pm25: number;
  pm10: number;
  o3: number;
  no2: number;
  so2: number;
  co: number;
}

interface PollutantBreakdownProps {
  data: PollutantData;
}

const pollutantInfo = {
  pm25: { name: 'PM2.5', unit: 'μg/m³', icon: Droplets, color: 'bg-blue-500' },
  pm10: { name: 'PM10', unit: 'μg/m³', icon: Wind, color: 'bg-green-500' },
  o3: { name: 'Ozone', unit: 'μg/m³', icon: Zap, color: 'bg-yellow-500' },
  no2: { name: 'NO₂', unit: 'μg/m³', icon: Activity, color: 'bg-orange-500' },
  so2: { name: 'SO₂', unit: 'μg/m³', icon: Activity, color: 'bg-red-500' },
  co: { name: 'CO', unit: 'μg/m³', icon: Activity, color: 'bg-purple-500' }
};

export const PollutantBreakdown: React.FC<PollutantBreakdownProps> = ({ data }) => {
  const maxValue = Math.max(...Object.values(data));

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Pollutant Breakdown</h3>
      
      <div className="space-y-4">
        {Object.entries(data).map(([key, value]) => {
          const info = pollutantInfo[key as keyof PollutantData];
          const IconComponent = info.icon;
          const percentage = (value / maxValue) * 100;
          
          return (
            <div key={key} className="flex items-center space-x-4">
              <div className={`p-2 rounded-lg ${info.color}`}>
                <IconComponent className="h-4 w-4 text-white" />
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">{info.name}</span>
                  <span className="text-sm text-gray-600">{value.toFixed(1)} {info.unit}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${info.color}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};