import React from 'react';
import { Heart, Shield, AlertTriangle, Activity } from 'lucide-react';

interface HealthRecommendationsProps {
  aqi: number;
}

export const HealthRecommendations: React.FC<HealthRecommendationsProps> = ({ aqi }) => {
  const getRecommendations = (aqi: number) => {
    if (aqi <= 50) {
      return {
        level: 'Good',
        color: 'bg-green-50 border-green-200',
        iconColor: 'text-green-500',
        icon: Heart,
        title: 'Air quality is satisfactory',
        recommendations: [
          'Perfect for outdoor activities',
          'Great time for exercise and sports',
          'Windows can be opened for fresh air',
          'Ideal conditions for all age groups'
        ]
      };
    } else if (aqi <= 100) {
      return {
        level: 'Moderate',
        color: 'bg-yellow-50 border-yellow-200',
        iconColor: 'text-yellow-500',
        icon: Shield,
        title: 'Air quality is acceptable',
        recommendations: [
          'Outdoor activities are generally fine',
          'Sensitive individuals should limit prolonged exposure',
          'Consider shorter outdoor exercise sessions',
          'Good ventilation recommended indoors'
        ]
      };
    } else if (aqi <= 150) {
      return {
        level: 'Unhealthy for Sensitive Groups',
        color: 'bg-orange-50 border-orange-200',
        iconColor: 'text-orange-500',
        icon: AlertTriangle,
        title: 'Sensitive groups should be careful',
        recommendations: [
          'Limit outdoor activities if you have respiratory conditions',
          'Children and elderly should reduce outdoor exposure',
          'Consider using air purifiers indoors',
          'Keep windows closed during peak pollution hours'
        ]
      };
    } else if (aqi <= 200) {
      return {
        level: 'Unhealthy',
        color: 'bg-red-50 border-red-200',
        iconColor: 'text-red-500',
        icon: AlertTriangle,
        title: 'Everyone should limit outdoor exposure',
        recommendations: [
          'Avoid outdoor exercise and activities',
          'Stay indoors as much as possible',
          'Use air purifiers and keep windows closed',
          'Wear masks if you must go outside'
        ]
      };
    } else {
      return {
        level: 'Very Unhealthy to Hazardous',
        color: 'bg-purple-50 border-purple-200',
        iconColor: 'text-purple-500',
        icon: Activity,
        title: 'Health alert: serious health effects',
        recommendations: [
          'Avoid all outdoor activities',
          'Stay indoors and keep windows closed',
          'Use air purifiers on high settings',
          'Seek medical attention if experiencing symptoms',
          'Consider evacuating if conditions persist'
        ]
      };
    }
  };

  const recommendations = getRecommendations(aqi);
  const IconComponent = recommendations.icon;

  return (
    <div className={`rounded-2xl border-2 p-6 ${recommendations.color}`}>
      <div className="flex items-center space-x-3 mb-4">
        <IconComponent className={`h-6 w-6 ${recommendations.iconColor}`} />
        <h3 className="text-lg font-semibold text-gray-800">{recommendations.title}</h3>
      </div>
      
      <div className="space-y-3">
        {recommendations.recommendations.map((rec, index) => (
          <div key={index} className="flex items-start space-x-2">
            <div className={`w-2 h-2 rounded-full mt-2 ${recommendations.iconColor.replace('text-', 'bg-')}`}></div>
            <p className="text-sm text-gray-700">{rec}</p>
          </div>
        ))}
      </div>
    </div>
  );
};