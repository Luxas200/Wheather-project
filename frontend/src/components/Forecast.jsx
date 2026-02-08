import React from 'react';

export default function Forecast({ data }) {
  if (!data || !data.daily) return null;
  const days = data.daily.time.map((t, i) => ({
    date: t,
    max: data.daily.temperature_2m_max[i],
    min: data.daily.temperature_2m_min[i],
    precip: data.daily.precipitation_sum ? data.daily.precipitation_sum[i] : null
  })).slice(0,5);

  return (
    <div className="card forecast">
      <h3>5-day forecast</h3>
      <div className="forecast-grid">
        {days.map(d => (
          <div key={d.date} className="day">
            <div>{d.date}</div>
            <div>Max: {d.max}°C</div>
            <div>Min: {d.min}°C</div>
            {d.precip !== null && <div>Precip: {d.precip} mm</div>}
          </div>
        ))}
      </div>
    </div>
  );
}