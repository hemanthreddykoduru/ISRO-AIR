import React from 'react';
import { Satellite, Globe, Activity } from 'lucide-react';

export const ISROHeader: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white py-8 px-6 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 left-4 w-32 h-32 border border-white/20 rounded-full"></div>
        <div className="absolute top-12 right-8 w-24 h-24 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-4 left-1/3 w-16 h-16 border border-white/20 rounded-full"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="flex items-center justify-between mb-6">
          {/* ISRO Logo and Branding */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <Satellite className="h-8 w-8 text-white animate-pulse" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-wide">ISRO</h1>
                <p className="text-sm text-blue-200">Indian Space Research Organisation</p>
              </div>
            </div>
            
            <div className="hidden md:block w-px h-12 bg-white/30"></div>
            
            <div className="hidden md:block">
              <h2 className="text-xl font-semibold">Satellite-Based Air Quality Monitoring</h2>
              <p className="text-blue-200 text-sm">Real-time Environmental Intelligence System</p>
            </div>
          </div>
          
          {/* Live Status Indicator */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-green-500/20 px-4 py-2 rounded-full border border-green-400/30">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">LIVE</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Globe className="h-4 w-4" />
              <span>Global Coverage</span>
            </div>
          </div>
        </div>
        
        {/* Mission Statement */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div className="flex items-center space-x-3 mb-3">
            <Activity className="h-5 w-5 text-orange-400" />
            <h3 className="text-lg font-semibold">Mission Objective</h3>
          </div>
          <p className="text-blue-100 leading-relaxed">
            Leveraging advanced satellite technology and ground-based sensors to provide comprehensive, 
            real-time air quality monitoring and predictive analytics for environmental protection and 
            public health across India's diverse geographical regions.
          </p>
        </div>
      </div>
    </div>
  );
};