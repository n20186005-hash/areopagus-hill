import { getTranslations, getLocale } from 'next-intl/server';

interface CurrentWeather {
  temperature: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
}

interface DailyForecast {
  date: string;
  tempMax: number;
  tempMin: number;
  weatherCode: number;
  precipitation: number;
}

interface WeatherData {
  current: CurrentWeather;
  daily: DailyForecast[];
}

const weatherDescriptions: Record<number, string> = {
  0: 'clearSky',
  1: 'mainlyClear',
  2: 'partlyCloudy',
  3: 'overcast',
  45: 'fog',
  48: 'fog',
  51: 'lightDrizzle',
  53: 'drizzle',
  55: 'heavyDrizzle',
  61: 'lightRain',
  63: 'rain',
  65: 'heavyRain',
  71: 'lightSnow',
  73: 'snow',
  75: 'heavySnow',
  80: 'rainShowers',
  81: 'rainShowers',
  82: 'heavyShowers',
  95: 'thunderstorm',
  96: 'thunderstorm',
  99: 'thunderstorm',
};

function getWeatherIcon(code: number): string {
  if (code === 0) return '☀️';
  if (code <= 2) return '⛅';
  if (code === 3) return '☁️';
  if (code <= 48) return '🌫️';
  if (code <= 55) return '🌦️';
  if (code <= 65) return '🌧️';
  if (code <= 75) return '🌨️';
  if (code <= 82) return '🌧️';
  return '⛈️';
}

async function getWeather(): Promise<WeatherData | null> {
  try {
    const lat = 37.9715;
    const lon = 23.7261;
    
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max&timezone=Europe%2FAthens&forecast_days=7`;
    
    const res = await fetch(url, {
      next: { revalidate: 1800 },
    });
    
    if (!res.ok) return null;
    
    const data = await res.json();
    
    const current: CurrentWeather = {
      temperature: Math.round(data.current.temperature_2m),
      humidity: data.current.relative_humidity_2m,
      windSpeed: Math.round(data.current.wind_speed_10m),
      weatherCode: data.current.weather_code,
    };
    
    const daily: DailyForecast[] = data.daily.time.map((date: string, i: number) => ({
      date,
      tempMax: Math.round(data.daily.temperature_2m_max[i]),
      tempMin: Math.round(data.daily.temperature_2m_min[i]),
      weatherCode: data.daily.weather_code[i],
      precipitation: data.daily.precipitation_probability_max[i],
    }));
    
    return { current, daily };
  } catch {
    return null;
  }
}

function formatDate(dateStr: string, locale: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  if (date.getTime() === today.getTime()) {
    return locale === 'zh' ? '今天' : locale === 'el' ? 'Σήμερα' : 'Today';
  }
  if (date.getTime() === tomorrow.getTime()) {
    return locale === 'zh' ? '明天' : locale === 'el' ? 'Αύριο' : 'Tomorrow';
  }
  
  return date.toLocaleDateString(locale === 'zh' ? 'zh-CN' : locale === 'el' ? 'el-GR' : 'en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

export default async function WeatherWidget() {
  const t = await getTranslations('weather');
  const locale = await getLocale();
  const weather = await getWeather();
  
  if (!weather) {
    return null;
  }
  
  const currentCondition = weatherDescriptions[weather.current.weatherCode] || 'unknown';
  
  return (
    <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-5xl mx-auto px-4">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-4 text-center"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-8 mx-auto" style={{ background: 'var(--accent)' }} />
        
        <p
          className="text-lg leading-relaxed text-center mb-10 max-w-3xl mx-auto"
          style={{ color: 'var(--text-secondary)' }}
        >
          {t('description')}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div
            className="lg:col-span-1 p-8 rounded-2xl border border-white/10"
            style={{ background: 'var(--bg-secondary)' }}
          >
            <h3
              className="font-display text-xl font-semibold mb-6"
              style={{ color: 'var(--text-primary)' }}
            >
              {t('currentWeather')}
            </h3>
            
            <div className="text-center mb-6">
              <div className="text-6xl mb-3">{getWeatherIcon(weather.current.weatherCode)}</div>
              <div className="text-5xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                {weather.current.temperature}°C
              </div>
              <div className="text-lg capitalize" style={{ color: 'var(--text-secondary)' }}>
                {t(currentCondition)}
              </div>
            </div>
            
            <div className="space-y-3 pt-4 border-t border-white/10">
              <div className="flex justify-between items-center">
                <span style={{ color: 'var(--text-secondary)' }}>{t('humidity')}</span>
                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {weather.current.humidity}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span style={{ color: 'var(--text-secondary)' }}>{t('windSpeed')}</span>
                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {weather.current.windSpeed} km/h
                </span>
              </div>
            </div>
          </div>

          <div
            className="lg:col-span-2 p-8 rounded-2xl border border-white/10"
            style={{ background: 'var(--bg-secondary)' }}
          >
            <h3
              className="font-display text-xl font-semibold mb-6"
              style={{ color: 'var(--text-primary)' }}
            >
              {t('forecast')}
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {weather.daily.map((day, i) => (
                <div
                  key={day.date}
                  className="p-4 rounded-xl text-center border border-white/10 hover:border-white/20 transition-colors"
                  style={{ background: 'var(--bg-primary)' }}
                >
                  <div
                    className="text-sm font-medium mb-2"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {formatDate(day.date, locale)}
                  </div>
                  <div className="text-3xl mb-2">{getWeatherIcon(day.weatherCode)}</div>
                  <div className="space-y-1">
                    <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {day.tempMax}°
                    </div>
                    <div style={{ color: 'var(--text-secondary)' }}>
                      {day.tempMin}°
                    </div>
                  </div>
                  {day.precipitation > 0 && (
                    <div
                      className="text-xs mt-2 pt-2 border-t border-white/10"
                      style={{ color: 'var(--accent)' }}
                    >
                      💧 {day.precipitation}%
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="mt-6 p-4 rounded-xl text-sm text-center"
          style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}
        >
          {t('dataSource')}:{' '}
          <a
            href="https://open-meteo.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-80"
            style={{ color: 'var(--accent)' }}
          >
            Open-Meteo API
          </a>
        </div>
      </div>
    </section>
  );
}
