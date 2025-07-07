import { useState, useEffect } from 'react';

interface AirQualityData {
  aqi: number;
  mainPollutant: string;
  location: string;
  timestamp: string;
  pollutants: {
    pm25: number;
    pm10: number;
    o3: number;
    no2: number;
    so2: number;
    co: number;
  };
  forecast: Array<{
    date: string;
    aqi: number;
    trend: 'up' | 'down' | 'stable';
  }>;
}

export const useAirQuality = () => {
  const [data, setData] = useState<AirQualityData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAirQuality = async (location: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulating API call with realistic data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockData: AirQualityData = {
        aqi: Math.floor(Math.random() * 150) + 25,
        mainPollutant: ['PM2.5', 'PM10', 'O3', 'NO2'][Math.floor(Math.random() * 4)],
        location: location,
        timestamp: new Date().toLocaleTimeString(),
        pollutants: {
          pm25: Math.random() * 50 + 10,
          pm10: Math.random() * 80 + 20,
          o3: Math.random() * 120 + 30,
          no2: Math.random() * 60 + 15,
          so2: Math.random() * 40 + 5,
          co: Math.random() * 2000 + 500
        },
        forecast: Array.from({ length: 5 }, (_, i) => ({
          date: new Date(Date.now() + (i + 1) * 24 * 60 * 60 * 1000).toISOString(),
          aqi: Math.floor(Math.random() * 120) + 30,
          trend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)] as 'up' | 'down' | 'stable'
        }))
      };
      
      setData(mockData);
    } catch (err) {
      setError('Failed to fetch air quality data');
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchAirQuality(`${latitude.toFixed(2)}, ${longitude.toFixed(2)}`);
        },
        () => {
          setError('Unable to get your location');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser');
    }
  };

  return {
    data,
    isLoading,
    error,
    fetchAirQuality,
    getCurrentLocation
  };
};