import React, { useState } from 'react';
import { Wind, RefreshCw, AlertCircle, Presentation } from 'lucide-react';
import { ISROHeader } from './components/ISROHeader';
import { SatelliteStatus } from './components/SatelliteStatus';
import { LiveDataFeed } from './components/LiveDataFeed';
import { PresentationStats } from './components/PresentationStats';
import { TechnicalSpecs } from './components/TechnicalSpecs';
import { LocationSearch } from './components/LocationSearch';
import { AirQualityCard } from './components/AirQualityCard';
import { PollutantBreakdown } from './components/PollutantBreakdown';
import { ForecastChart } from './components/ForecastChart';
import { HealthRecommendations } from './components/HealthRecommendations';
import { useAirQuality } from './hooks/useAirQuality';

function App() {
  const { data, isLoading, error, fetchAirQuality, getCurrentLocation } = useAirQuality();
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [presentationMode, setPresentationMode] = useState(true);

  const handleLocationSelect = (location: string) => {
    fetchAirQuality(location);
    setLastUpdate(new Date());
  };

  const handleCurrentLocation = () => {
    getCurrentLocation();
    setLastUpdate(new Date());
  };

  const handleRefresh = () => {
    if (data) {
      fetchAirQuality(data.location);
      setLastUpdate(new Date());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* ISRO Header */}
      <ISROHeader />
      
      <div className="container mx-auto px-4 py-8">
        {/* Presentation Mode Toggle */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setPresentationMode(!presentationMode)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
          >
            <Presentation className="h-4 w-4" />
            <span>{presentationMode ? 'Exit Presentation' : 'Presentation Mode'}</span>
          </button>
        </div>

        {presentationMode ? (
          /* Presentation Layout */
          <div className="space-y-8">
            {/* Key Statistics */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">System Performance Overview</h2>
              <PresentationStats />
            </section>

            {/* Live Systems Status */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <SatelliteStatus />
              <LiveDataFeed />
            </section>

            {/* Technical Architecture */}
            <section>
              <TechnicalSpecs />
            </section>

            {/* Sample Data Visualization */}
            {data && (
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Live Data Demonstration</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <AirQualityCard
                    aqi={data.aqi}
                    mainPollutant={data.mainPollutant}
                    location={data.location}
                    timestamp={data.timestamp}
                  />
                  <div className="lg:col-span-2">
                    <PollutantBreakdown data={data.pollutants} />
                  </div>
                </div>
              </section>
            )}
          </div>
        ) : (
          /* Regular Application Layout */
          <>
            {/* Location Search */}
            <div className="max-w-2xl mx-auto mb-8">
              <LocationSearch
                onLocationSelect={handleLocationSelect}
                onCurrentLocation={handleCurrentLocation}
                isLoading={isLoading}
              />
            </div>

            {/* Error State */}
            {error && (
              <div className="max-w-2xl mx-auto mb-8">
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center space-x-3">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            )}

            {/* Main Content */}
            {data && (
              <div className="max-w-7xl mx-auto">
                {/* Header with Refresh */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800">Air Quality Data</h2>
                  <div className="flex items-center space-x-4">
                    {lastUpdate && (
                      <span className="text-sm text-gray-500">
                        Last updated: {lastUpdate.toLocaleTimeString()}
                      </span>
                    )}
                    <button
                      onClick={handleRefresh}
                      disabled={isLoading}
                      className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-all duration-200"
                    >
                      <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                      <span>Refresh</span>
                    </button>
                  </div>
                </div>

                {/* Main Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  <div className="lg:col-span-1">
                    <AirQualityCard
                      aqi={data.aqi}
                      mainPollutant={data.mainPollutant}
                      location={data.location}
                      timestamp={data.timestamp}
                    />
                  </div>
                  
                  <div className="lg:col-span-2">
                    <PollutantBreakdown data={data.pollutants} />
                  </div>
                </div>

                {/* Forecast and Recommendations */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ForecastChart data={data.forecast} />
                  <HealthRecommendations aqi={data.aqi} />
                </div>
              </div>
            )}

            {/* Initial State */}
            {!data && !isLoading && !error && (
              <div className="max-w-2xl mx-auto text-center">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <Wind className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">ISRO Air Quality Monitoring System</h3>
                  <p className="text-gray-600">
                    Start by searching for a location or use your current location to get real-time satellite-based air quality data and forecasts.
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;