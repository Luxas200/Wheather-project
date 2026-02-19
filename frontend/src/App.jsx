import React, { useEffect, useState } from 'react';
import cities from './data/cities.json';
import CitySearch from './components/CitySearch';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import { fetchWeatherByCoords } from './api/weatherApi';
import { logCitySelection } from './api/backendApi';
import { useRecentCities } from './hooks/useRecentCities';
import './styles/main.scss';

export default function App() {
  const [currentCity, setCurrentCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const { list, pushCity } = useRecentCities();

  useEffect(() => {
    const saved = localStorage.getItem('currentCity');
    if (saved) {
      try {
        const city = JSON.parse(saved);
        if (city && city.lat && city.lon) {
          setCurrentCity(city);
          loadWeather(city);
        }
      } catch (e) {
        console.warn('Failed to parse saved currentCity', e);
      }
    }
  }, []);

  async function loadWeather(city) {
    if (!city || !city.lat || !city.lon) return;
    setLoading(true);
    try {
      const data = await fetchWeatherByCoords(city.lat, city.lon);
      setWeather(data);
    } catch (err) {
      console.error('Weather fetch failed', err);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }

  async function onCitySelect(city) {
    if (!city) return;
    setCurrentCity(city);
    localStorage.setItem('currentCity', JSON.stringify(city));
    await loadWeather(city);
    try {
      logCitySelection(city.name);
    } catch (e) {
      console.warn('Failed to log city selection', e);
    }
    pushCity(city);
  }

  return (
    <div className="container">
      <h1>Weather Web</h1>
      <CitySearch cities={cities} onSelect={onCitySelect} />
      <div className="recent">
        <h4>Recent:</h4>
        {list.length === 0 && <div>No recent cities</div>}
        {list.map((c) => (
          <button
            key={`${c.name}-${c.lat}-${c.lon}`}
            onClick={() => onCitySelect(c)}
            className="recent-btn"
          >
            {c.name}
          </button>
        ))}
      </div>
      <CurrentWeather data={weather} city={currentCity} loading={loading} />
      <Forecast data={weather} />
    </div>
  );
}