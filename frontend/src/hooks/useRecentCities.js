import { useState } from 'react';

export function useRecentCities(key = 'recentCities') {
  const [list, setList] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) || []; } catch { return []; }
  });

  function pushCity(city) {
    const newList = [city, ...list.filter(c => c.name !== city.name)].slice(0,3);
    setList(newList);
    localStorage.setItem(key, JSON.stringify(newList));
  }
  return { list, pushCity, setList };
}