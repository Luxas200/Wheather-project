import React from 'react';

export default function CurrentWeather({ data, city }) {
  if (!data || !data.current_weather) return null;
  const cur = data.current_weather;
  const cityName = city?.name || 'Unknown city';

  return (
    <div className="card current-weather">
      <h3>Current {cityName}</h3>
      <p><strong>Temp:</strong> {cur.temperature}°C</p>
      <p><strong>Wind:</strong> {cur.windspeed} m/s</p>
      <p><strong>Direction:</strong> {cur.winddirection}°</p>
    </div>
  );
}
