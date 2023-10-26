const weatherCodes: Record<number, string> = {
  0: 'Tiszta, kék ég',
  1: 'Majdnem felhőtlen',
  2: 'Részben felhős',
  3: 'Borult',
  45: 'Köd',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  56: 'Light freezing drizzle',
  57: 'Dense freezing drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  66: 'Light freezing rain',
  67: 'Heavy freezing rain',
  71: 'Slight snow fall',
  73: 'Moderate snow fall',
  75: 'Heavy snow fall',
  77: 'Snow grains',
  80: 'Slight rain showers',
  81: 'Moderate rain showers',
  82: 'Violent rain showers',
  85: 'Slight snow showers',
  86: 'Heavy snow showers',
  95: 'Moderate thunderstorm',
  96: 'Thunderstorm with slight hail',
  99: 'Thunderstorm with heavy hail',
};

interface CurrentWeatherApiResponse {
  temperature: string;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  is_day: number;
  time: string;
}

export interface Temperature {
  value: number;
  unit: string;
}

const formatTemperature = (temp: Temperature): string =>
  `${temp.value}${temp.unit}`;

export interface Wind {
  speed: number;
  direction: number;
  unit: string;
}

const formatWind = (wind: Wind): string => `${wind.speed}${wind.unit}`;

export class CurrentWeather {
  temperature: Temperature;
  wind: Wind;
  weathercode: number;
  daytime: boolean;
  time: string;

  constructor(apiResponse: CurrentWeatherApiResponse) {
    this.temperature = {
      value: parseInt(apiResponse.temperature),
      unit: 'C',
    };
    this.wind = {
      speed: apiResponse.windspeed,
      direction: apiResponse.winddirection,
      unit: 'kmh',
    };
    this.weathercode = apiResponse.weathercode;
    this.daytime = apiResponse.is_day === 1;
    this.time = apiResponse.time;
  }

  condition(): string {
    return weatherCodes[this.weathercode];
  }

  format(): string {
    const descriptionLen = 16;

    const temp = 'Temperature'.padStart(descriptionLen, ' ');
    const windSpeed = 'Wind speed'.padStart(descriptionLen, ' ');
    const condition = 'Condition'.padStart(descriptionLen, ' ');

    const formatted: string[] = [];

    formatted.push(`${temp}: ${formatTemperature(this.temperature)}`);
    formatted.push(`${windSpeed}: ${formatWind(this.wind)}`);
    formatted.push(`${condition}: ${this.condition()}`);

    return formatted.join('\n');
  }
}
