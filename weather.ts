import { fetchLocationData } from './location';
import { fetchWeatherData } from './weatherapi';
import type { LocationInfo } from './location';

const GEOCODE_API_URL = 'https://geocode.maps.co/search';
const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';

async function main(): Promise<number> {
  // pnpm run weather LOCATION
  if (process.argv.length !== 3) {
    console.error('usage: weather LOCATION');
    return 1;
  }

  const location = process.argv[2];

  let locationInfo: LocationInfo;
  try {
    locationInfo = await fetchLocationData(GEOCODE_API_URL, location);
  } catch (err) {
    console.error(err);
    return 1;
  }

  console.log(`Fetching weather data for ${locationInfo.display_name}...\n`);

  try {
    const weather = await fetchWeatherData(
      WEATHER_API_URL,
      locationInfo.lat,
      locationInfo.lon
    );
    console.log(weather.format());
  } catch (err) {
    console.error(err);
    return 1;
  }

  return await Promise.resolve(0);
}

main().catch((err) => console.error(err));
