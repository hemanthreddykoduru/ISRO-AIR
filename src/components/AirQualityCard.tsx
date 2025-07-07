import React from 'react';
import { Wind, Eye, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

interface AirQualityCardProps {
  aqi: number;
  mainPollutant: string;
  location: string;
  timestamp: string;
}

const getAQIInfo = (aqi: number) => {
  if (aqi <= 50) return { level: 'Good', color: 'bg-green-500', textColor: 'text-green-700', icon: CheckCircle };
  if (aqi <= 100) return { level: 'Moderate', color: 'bg-yellow-500', textColor: 'text-yellow-700', icon: AlertCircle };
  if (aqi <= 150) return { level: 'Unhealthy for Sensitive Groups', color: 'bg-orange-500', textColor: 'text-orange-700', icon: AlertCircle };
  if (aqi <= 200) return { level: 'Unhealthy', color: 'bg-red-500', textColor: 'text-red-700', icon: XCircle };
  if (aqi <= 300) return { level: 'Very Unhealthy', color: 'bg-purple-500', textColor: 'text-purple-700', icon: XCircle };
  return { level: 'Hazardous', color: 'bg-red-900', textColor: 'text-red-900', icon: XCircle };
};

export const AirQualityCard: React.FC<AirQualityCardProps> = ({ aqi, mainPollutant, location, timestamp }) => {
  const aqiInfo = getAQIInfo(aqi);
  const IconComponent = aqiInfo.icon;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Wind className="h-5 w-5 text-blue-500" />
          <span className="text-sm font-medium text-gray-600">{location}</span>
        </div>
        <div className="flex items-center space-x-1">
          <IconComponent className={`h-4 w-4 ${aqiInfo.textColor}`} />
          <span className={`text-xs font-medium ${aqiInfo.textColor}`}>{aqiInfo.level}</span>
        </div>
      </div>
      
      <div className="text-center mb-4">
        <div className="relative inline-block">
          <div className={`w-24 h-24 rounded-full ${aqiInfo.color} flex items-center justify-center mx-auto mb-2 transition-all duration-300`}>
            <span className="text-2xl font-bold text-white">{aqi}</span>
          </div>
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
            <div className={`w-3 h-3 rounded-full ${aqiInfo.color} animate-pulse`}></div>
          </div>
        </div>
        <p className="text-sm text-gray-500">Air Quality Index</p>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Main Pollutant:</span>
          <span className="font-medium">{mainPollutant}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Last Updated:</span>
          <span className="font-medium">{timestamp}</span>
        </div>
      </div>
    </div>
  );
};