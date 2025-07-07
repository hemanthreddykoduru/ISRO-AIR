import React from 'react';
import { BarChart3, Users, MapPin, Zap } from 'lucide-react';

export const PresentationStats: React.FC = () => {
  const stats = [
    {
      icon: MapPin,
      label: 'Monitoring Stations',
      value: '2,847',
      change: '+12%',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      label: 'Population Covered',
      value: '1.2B+',
      change: '+8%',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: BarChart3,
      label: 'Data Points/Day',
      value: '45M+',
      change: '+25%',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Zap,
      label: 'Prediction Accuracy',
      value: '94.7%',
      change: '+3%',
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        
        return (
          <div 
            key={index}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                <IconComponent className="h-6 w-6 text-white" />
              </div>
              <div className="text-right">
                <div className="text-xs text-green-600 font-medium">{stat.change}</div>
              </div>
            </div>
            
            <div>
              <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
            
            <div className="mt-4 w-full bg-gray-200 rounded-full h-1">
              <div 
                className={`h-1 rounded-full bg-gradient-to-r ${stat.color} transition-all duration-1000`}
                style={{ width: `${70 + index * 10}%` }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};