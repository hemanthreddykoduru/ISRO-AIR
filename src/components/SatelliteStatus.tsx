import React from 'react';
import { Satellite, Signal, Zap, Globe2 } from 'lucide-react';

export const SatelliteStatus: React.FC = () => {
  const satellites = [
    { name: 'CARTOSAT-3', status: 'Active', signal: 98, coverage: 'Northern India' },
    { name: 'RESOURCESAT-2A', status: 'Active', signal: 95, coverage: 'Central India' },
    { name: 'OCEANSAT-3', status: 'Active', signal: 92, coverage: 'Coastal Regions' },
    { name: 'RISAT-2B', status: 'Standby', signal: 88, coverage: 'Southern India' }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-2xl">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-blue-500 rounded-lg">
          <Satellite className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold">Satellite Network Status</h3>
          <p className="text-slate-300 text-sm">Real-time monitoring constellation</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {satellites.map((sat, index) => (
          <div key={index} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-blue-300">{sat.name}</h4>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                sat.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {sat.status}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Signal className="h-4 w-4 text-green-400" />
                  <span>Signal Strength</span>
                </div>
                <span className="font-medium">{sat.signal}%</span>
              </div>
              
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${sat.signal}%` }}
                ></div>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-slate-300">
                <Globe2 className="h-4 w-4" />
                <span>{sat.coverage}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 flex items-center justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span>4 Satellites Active</span>
        </div>
        <div className="flex items-center space-x-2">
          <Zap className="h-4 w-4 text-yellow-400" />
          <span>Real-time Data Stream</span>
        </div>
      </div>
    </div>
  );
};