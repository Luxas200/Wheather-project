export async function logCitySelection(city) {
  try {
    await fetch('http://localhost:4000/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ city })
    });
  } catch (e) {
    console.warn('Log failed', e);
  }
}