import React, { useState } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';

interface LocationSearchProps {
  onLocationSelect: (location: string) => void;
  onCurrentLocation: () => void;
  isLoading: boolean;
}

export const LocationSearch: React.FC<LocationSearchProps> = ({ 
  onLocationSelect, 
  onCurrentLocation, 
  isLoading 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onLocationSelect(searchTerm.trim());
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Location Search</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter city name or location..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>
        
        <div className="flex space-x-3">
          <button
            type="submit"
            disabled={!searchTerm.trim() || isLoading}
            className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Searching...</span>
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                <span>Search</span>
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={onCurrentLocation}
            disabled={isLoading}
            className="bg-green-500 text-white py-3 px-6 rounded-xl hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <MapPin className="h-4 w-4" />
            <span>Current Location</span>
          </button>
        </div>
      </form>
    </div>
  );
};