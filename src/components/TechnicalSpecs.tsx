import React from 'react';
import { Cpu, Database, Wifi, Shield } from 'lucide-react';

export const TechnicalSpecs: React.FC = () => {
  const specs = [
    {
      category: 'Data Processing',
      icon: Cpu,
      items: [
        'Real-time ML algorithms for AQI prediction',
        'Multi-spectral satellite image analysis',
        'Ground sensor data fusion',
        'Weather pattern correlation'
      ]
    },
    {
      category: 'Data Storage',
      icon: Database,
      items: [
        'Distributed cloud infrastructure',
        'Historical data: 10+ years',
        'Real-time streaming: 1TB/day',
        'Backup & disaster recovery'
      ]
    },
    {
      category: 'Connectivity',
      icon: Wifi,
      items: [
        'Satellite communication links',
        '5G/4G ground station networks',
        'IoT sensor mesh networks',
        'API integration capabilities'
      ]
    },
    {
      category: 'Security',
      icon: Shield,
      items: [
        'End-to-end encryption',
        'Multi-factor authentication',
        'Secure data transmission',
        'Compliance with govt. standards'
      ]
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Technical Architecture</h3>
        <p className="text-gray-600">Advanced systems powering India's air quality monitoring</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {specs.map((spec, index) => {
          const IconComponent = spec.icon;
          
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <IconComponent className="h-5 w-5 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800">{spec.category}</h4>
              </div>
              
              <ul className="space-y-2">
                {spec.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start space-x-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};